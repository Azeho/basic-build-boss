# Disk Space Analysis and Cleanup Guide

## Overview

This script helps you analyze and clean up disk space on Linux servers, with special support for OpenVZ/Virtuozzo containers (ploop devices).

## Quick Start

### 1. Transfer the script to your server

```bash
# Option 1: Using scp
scp disk-cleanup.sh user@your-server:/tmp/

# Option 2: Using curl (if you host it)
curl -o disk-cleanup.sh https://your-url/disk-cleanup.sh

# Option 3: Copy-paste the content manually
nano disk-cleanup.sh
# Paste the content, then save
```

### 2. Make it executable

```bash
chmod +x disk-cleanup.sh
```

### 3. Run the script

```bash
# For full functionality (recommended)
sudo ./disk-cleanup.sh

# Or without sudo (limited functionality)
./disk-cleanup.sh
```

## Features

### Analysis Features

1. **Quick Analysis**
   - Current disk usage overview
   - Log files size
   - Package manager caches
   - Temporary files

2. **Full Analysis** (detailed scan)
   - Top 20 largest directories
   - Top 20 largest files (>100MB)
   - Log files breakdown
   - Docker disk usage
   - Package manager caches (APT, YUM, DNF, npm, pip)
   - Temporary files status
   - Old kernel packages

3. **Report Generation**
   - Creates a timestamped report file
   - Contains all analysis data
   - Useful for record-keeping or sharing

### Cleanup Options

#### Safe Cleanups (Automated)
- ✅ APT cache cleanup
- ✅ YUM/DNF cache cleanup
- ✅ npm cache cleanup
- ✅ pip cache cleanup
- ✅ Old temporary files cleanup

#### Careful Cleanups (Interactive)
- ⚠️ Old log files (>30 days)
- ⚠️ Docker unused images/containers
- ⚠️ Old kernel packages

#### Guided Cleanups
- Custom cleanup commands
- Manual intervention guidance

## What is ploop11004p1?

**ploop** devices are virtual disks used by **Virtuozzo/OpenVZ** container platforms:

- `/dev/ploop11004p1` = Container ID 11004, Partition 1
- Common in VPS hosting environments
- Acts as a virtual hard disk for your container

When this shows 97% full, you're running out of disk space in your virtual container.

## Understanding Disk Usage

### Common Culprits

1. **Log Files** (`/var/log/`)
   - Application logs grow indefinitely
   - Rotated logs accumulate
   - **Solution**: Clean old logs or configure log rotation

2. **Docker** (if installed)
   - Old images and containers
   - Unused volumes
   - Build cache
   - **Solution**: `docker system prune -a --volumes`

3. **Package Caches**
   - `/var/cache/apt/` (Debian/Ubuntu)
   - `/var/cache/yum/` (RHEL/CentOS)
   - `~/.npm/` (npm)
   - **Solution**: Clean caches regularly

4. **Build Artifacts**
   - `node_modules/`
   - `dist/`, `build/`, `.cache/`
   - **Solution**: Remove and reinstall when needed

5. **Old Kernels**
   - Multiple kernel versions installed
   - **Solution**: Keep only current + 1 old kernel

6. **Large Files**
   - Database dumps
   - Backups
   - Media files
   - **Solution**: Move to external storage or delete

## Manual Investigation Commands

After running the script, you might want to investigate specific directories:

```bash
# Find what's using space in a specific directory
du -h --max-depth=1 /var | sort -hr

# Find all files larger than 500MB
find / -type f -size +500M -exec ls -lh {} \; 2>/dev/null

# Find files modified in last 7 days (to avoid deleting active files)
find /var/log -type f -mtime -7 -ls

# Check systemd journal size
journalctl --disk-usage

# Clean systemd journal (keep only 7 days)
sudo journalctl --vacuum-time=7d

# Find files owned by a specific user
find /home -user username -exec du -sh {} \;

# Find duplicate files (requires fdupes)
sudo apt-get install fdupes
fdupes -r /path/to/check
```

## Safe Cleanup Checklist

Before running cleanups:

- [ ] Check current disk usage (`df -h`)
- [ ] Identify what's using space (run Quick Analysis)
- [ ] Backup important data
- [ ] Verify you're not deleting active application data
- [ ] Start with cache cleanups (safest)
- [ ] Check disk usage after each cleanup

## Emergency Cleanup (When 97%+ Full)

If your server is critically full and you need immediate space:

```bash
# 1. Clean package caches (SAFE)
sudo apt-get clean          # Debian/Ubuntu
sudo yum clean all          # RHEL/CentOS

# 2. Remove old logs (SAFE if >30 days old)
sudo find /var/log -name "*.gz" -mtime +30 -delete
sudo find /var/log -name "*.log" -mtime +30 -delete

# 3. Clean journal logs (SAFE)
sudo journalctl --vacuum-time=7d

# 4. Clean Docker (SAFE if you don't need old images)
sudo docker system prune -a --volumes -f

# 5. Empty trash (SAFE)
rm -rf ~/.local/share/Trash/*

# 6. Clean npm cache (SAFE)
npm cache clean --force

# 7. Remove old temp files (SAFE)
sudo find /tmp -type f -atime +7 -delete
sudo find /var/tmp -type f -atime +7 -delete
```

## Preventing Future Issues

1. **Setup Log Rotation**
```bash
# Check if logrotate is configured
cat /etc/logrotate.conf
ls /etc/logrotate.d/
```

2. **Monitor Disk Usage**
```bash
# Add to crontab for daily email reports
0 9 * * * df -h | mail -s "Disk Usage Report" your@email.com
```

3. **Setup Alerts**
```bash
# Create a monitoring script
#!/bin/bash
THRESHOLD=80
CURRENT=$(df / | grep / | awk '{ print $5}' | sed 's/%//g')
if [ "$CURRENT" -gt "$THRESHOLD" ]; then
    echo "Disk usage is above ${THRESHOLD}%" | mail -s "Disk Alert" your@email.com
fi
```

4. **Regular Maintenance**
   - Weekly: Clean package caches
   - Monthly: Review large files and directories
   - Quarterly: Clean old Docker images/containers
   - Yearly: Archive old logs to external storage

## Troubleshooting

### Script won't run
```bash
# Check if it's executable
ls -l disk-cleanup.sh

# Make it executable
chmod +x disk-cleanup.sh

# Check for line ending issues (if copied from Windows)
dos2unix disk-cleanup.sh
```

### Permission denied errors
```bash
# Run with sudo
sudo ./disk-cleanup.sh
```

### Still full after cleanup
```bash
# Check for deleted files still held by processes
sudo lsof | grep deleted

# Find the largest files
sudo find / -type f -size +1G -exec ls -lh {} \; 2>/dev/null

# Check if it's inodes (not space)
df -i
```

## Support

If you encounter issues:

1. Run the script in analysis mode first (option 1 or 2)
2. Generate a report (option 4)
3. Review the report to understand what's using space
4. Ask for help with specific directories/files

## System Requirements

- Linux OS (any distribution)
- Bash shell
- Basic Unix utilities (du, df, find, sort)
- Root/sudo access recommended (not required)

## Compatibility

Tested on:
- ✅ Ubuntu/Debian
- ✅ RHEL/CentOS/Fedora
- ✅ OpenVZ/Virtuozzo containers
- ✅ Standard VPS/cloud instances
- ✅ Bare metal servers

## License

Free to use and modify. No warranty provided.
