# cPanel Server Disk Cleanup Guide

## Quick Reference - What Just Happened

Your server was **97% full** and is now at **68%** - you freed **14GB** of space!

### What Was Cleaned
1. **Old Apache logs** (~10GB) - Archived logs from 2020-2025
2. **PHP error_log files** (~4GB) - Large error logs from websites
3. **Other system logs** - Various smaller cleanups

## The Problem: What is ploop11004p1?

`/dev/ploop11004p1` is a **Parallels Loop** virtual disk used by **Virtuozzo/OpenVZ** containers.
- Common in VPS hosting environments
- Acts as a virtual hard disk for your container
- When it shows 97% full, your virtual server is out of space

## Common Disk Space Problems on cPanel Servers

### 1. PHP error_log Files (BIGGEST CULPRIT) ⚠️

**Problem:** Websites create `error_log` files that grow indefinitely

**Location:** `/home/username/public_html/domain.com/error_log`

**How it happens:**
- PHP errors are logged to error_log
- No automatic rotation or cleanup
- Can grow to several GB per site

**Solution:**
```bash
# Find large error_log files
find /home/*/public_html -name "error_log" -size +10M -exec ls -lh {} \;

# Delete them
find /home/*/public_html -name "error_log" -size +10M -delete

# Prevent regrowth (make immutable)
find /home/*/public_html -name "error_log" -exec chattr +i {} \; 2>/dev/null
```

### 2. Apache Access/Error Logs

**Problem:** Apache logs every request and error

**Location:** `/var/log/apache2/` and `/var/log/apache2/archive/`

**Solution:**
```bash
# Clean old archives (>90 days)
find /var/log/apache2/archive/ -name "*.gz" -mtime +90 -delete
```

### 3. Email Storage

**Problem:** User mailboxes fill up with spam, old emails

**Location:** `/home/username/mail/`

**Check:**
```bash
# See which users have large mailboxes
du -sh /home/*/mail | sort -hr

# Check specific user's mail
du -sh /home/username/mail/*/Trash
du -sh /home/username/mail/*/spam
```

**Solution:**
- Set up email quotas in WHM
- Configure auto-deletion of Trash/Spam
- Ask users to use IMAP and delete old emails

### 4. Backups

**Problem:** Old cPanel backups not cleaned up

**Location:** `/home/username/backups/` or custom backup directories

**Check:**
```bash
find /home -name "*.tar.gz" -size +100M -exec ls -lh {} \;
```

### 5. Munin Monitoring Logs

**Problem:** Munin creates detailed monitoring logs

**Location:** `/var/log/munin/`

**Solution:**
```bash
# Keep only 30 days
find /var/log/munin/ -type f -mtime +30 -delete
```

## Using the cPanel Cleanup Script

### Installation

```bash
# Download or create the script on your server
cd /root
# Upload cpanel-disk-cleanup.sh to /root/

chmod +x cpanel-disk-cleanup.sh
```

### Usage

```bash
# Analyze mode (see what would be cleaned, no deletions)
./cpanel-disk-cleanup.sh --analyze

# Interactive cleanup (prompts before deleting)
./cpanel-disk-cleanup.sh

# The script will:
# 1. Show current disk usage
# 2. Find large error_log files
# 3. Find old log archives
# 4. Prompt before each cleanup
# 5. Show space freed
```

### What the Script Cleans

1. **error_log files** larger than 10MB
2. **Apache archives** older than 90 days
3. **Log archives** older than 90 days
4. **Munin logs** older than 30 days
5. **YUM cache**
6. **Temporary files** older than 7 days

## Manual Cleanup Commands

### Quick Wins (Run These Now)

```bash
# 1. Clean YUM cache
yum clean all

# 2. Delete large error_log files
find /home/*/public_html -name "error_log" -size +10M -delete

# 3. Clean old Apache archives
find /var/log/apache2/archive/ -name "*.gz" -mtime +90 -delete

# 4. Clean old log archives
find /var/log/archive/ -name "*.gz" -mtime +90 -delete

# 5. Clean Munin logs
find /var/log/munin/ -type f -mtime +30 -delete

# Check space freed
df -h
```

### Investigate User Directories

```bash
# See which users use the most space
du -sh /home/* | sort -hr | head -20

# Check a specific user's directory breakdown
du -sh /home/username/* | sort -hr

# Find large files in a user's directory
find /home/username -type f -size +100M -exec ls -lh {} \; 2>/dev/null
```

### Email-Specific Cleanup

```bash
# Find users with large mail directories
du -sh /home/*/mail | sort -hr

# Check spam/trash folders
for user in /home/*/mail; do
    echo "User: $user"
    du -sh $user/*/Trash $user/*/spam 2>/dev/null
done

# Clean a specific user's trash (CAREFUL - ask user first!)
rm -rf /home/username/mail/*/Trash/*
```

## Preventing Future Issues

### 1. Disable error_log Creation

**Option A: Make error_log immutable (recommended)**
```bash
# Create empty, immutable error_log files
find /home/*/public_html -type d | while read dir; do
    touch "$dir/error_log" 2>/dev/null
    chmod 444 "$dir/error_log" 2>/dev/null
    chattr +i "$dir/error_log" 2>/dev/null
done
```

**Option B: Disable via .htaccess**
```bash
# Add to each site's .htaccess
echo "php_flag log_errors Off" >> /home/username/public_html/domain.com/.htaccess
```

**Option C: Disable via php.ini**
```bash
# Edit PHP settings in WHM
# Or add to user's php.ini:
echo "log_errors = Off" >> /home/username/public_html/domain.com/php.ini
```

### 2. Set Up Automatic Cleanup (Cron Job)

```bash
# Edit root's crontab
crontab -e

# Add monthly cleanup (runs 1st of each month at 2 AM)
0 2 1 * * /root/cpanel-disk-cleanup.sh --non-interactive

# Or use these individual cron jobs:
0 2 1 * * find /var/log/apache2/archive/ -name "*.gz" -mtime +90 -delete
0 3 1 * * find /home/*/public_html -name "error_log" -size +10M -delete
0 4 1 * * find /var/log/munin/ -type f -mtime +30 -delete
0 5 1 * * yum clean all
```

### 3. Set Up Disk Usage Monitoring

```bash
# Create monitoring script
cat > /root/disk-monitor.sh << 'EOF'
#!/bin/bash
USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $USAGE -gt 80 ]; then
    echo "WARNING: Disk usage is ${USAGE}% on $(hostname)" | \
    mail -s "Disk Alert" root
fi
EOF

chmod +x /root/disk-monitor.sh

# Add to crontab (check daily)
# 0 9 * * * /root/disk-monitor.sh
```

### 4. Configure Email Quotas (WHM)

In WHM → Account Functions → Quota Modification:
- Set reasonable quotas per account (e.g., 5GB)
- Monitor accounts approaching quota
- Enable quota warnings

### 5. Enable cPanel Disk Usage Notifications

In WHM → Server Configuration → Tweak Settings:
- Enable "Disk Usage Notifications"
- Set threshold (e.g., 80%)

## Troubleshooting

### "No space left on device" even after cleanup

```bash
# Check for deleted files still held by processes
lsof | grep deleted | grep -v "/tmp"

# Restart Apache if it's holding deleted log files
systemctl restart httpd

# Check inode usage (not just space)
df -i
```

### error_log keeps coming back

```bash
# Make it truly immutable
chattr +i /home/username/public_html/domain.com/error_log

# Verify
lsattr /home/username/public_html/domain.com/error_log

# To undo later (if needed):
# chattr -i /home/username/public_html/domain.com/error_log
```

### Can't delete files (Permission denied)

```bash
# Check file attributes
lsattr filename

# Remove immutable flag
chattr -i filename

# Then delete
rm filename
```

## Best Practices for cPanel Servers

1. **Regular Maintenance**
   - Run cleanup monthly
   - Monitor disk usage weekly
   - Review user accounts quarterly

2. **Proactive Monitoring**
   - Set up disk alerts at 80%
   - Monitor top space users
   - Check for abandoned accounts

3. **User Education**
   - Inform users about quotas
   - Teach email management
   - Explain backup retention

4. **Log Management**
   - Rotate logs regularly
   - Archive old logs off-server
   - Delete archives after 90 days

5. **Email Management**
   - Set mailbox quotas
   - Enable auto-deletion of spam/trash
   - Consider external email hosting

## Quick Disk Space Targets

- **Green (Healthy):** 60-75% used
- **Yellow (Monitor):** 75-85% used
- **Orange (Action Needed):** 85-90% used
- **Red (Critical):** 90%+ used

## Current Status: 68% ✅

You're in the **GREEN zone** - excellent work!

## Maintenance Schedule

- **Daily:** Automated monitoring
- **Weekly:** Check disk usage
- **Monthly:** Run cleanup script
- **Quarterly:** Review user accounts and large files
- **Yearly:** Audit and archive old data

## Emergency Cleanup (90%+ Full)

```bash
# Run all safe cleanups immediately
find /home/*/public_html -name "error_log" -size +10M -delete
find /var/log/apache2/archive/ -name "*.gz" -mtime +30 -delete
find /var/log/archive/ -name "*.gz" -mtime +30 -delete
find /var/log/munin/ -type f -mtime +7 -delete
yum clean all
find /tmp -type f -atime +1 -delete

# Then investigate largest users
du -sh /home/* | sort -hr | head -10
```

## Support

For cPanel-specific issues:
- Check WHM → Server Status → Service Status
- Review /var/log/messages for system errors
- Contact your hosting provider if you need help

## Summary of Your Success

- **Started:** 97% full (~2GB available)
- **Now:** 68% full (14GB available)
- **Freed:** 14GB total
- **Status:** Healthy ✅

Great job managing your server!
