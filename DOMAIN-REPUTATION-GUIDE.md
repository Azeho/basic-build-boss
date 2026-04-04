# Domain Reputation Enhancement Guide
## For sungur-electronics.com

This guide will help you improve your domain's email reputation and deliverability, ensuring your emails reach the inbox instead of spam.

---

## 📊 Understanding Domain Reputation

Domain reputation is how email providers (Gmail, Outlook, Yahoo, etc.) view your domain. A good reputation means:
- ✅ Emails land in inbox
- ✅ Higher open rates
- ✅ Better customer communication
- ✅ Professional appearance

Poor reputation means:
- ❌ Emails go to spam/junk
- ❌ Emails get blocked
- ❌ Lost business opportunities

---

## 🎯 Quick Start - Essential Steps

### 1. **SPF Record** (Sender Policy Framework)
**What it does:** Tells email servers which IPs are allowed to send email for your domain.

**Add this DNS record:**
```
Type: TXT
Host: @ (or sungur-electronics.com)
Value: v=spf1 ip4:YOUR_SERVER_IP a mx ~all
```

**How to find your server IP:**
```bash
curl ifconfig.me
```

**Example:**
```
v=spf1 ip4:209.59.213.25 a mx ~all
```

**Explanation:**
- `v=spf1` - SPF version 1
- `ip4:YOUR_IP` - Allow your server IP
- `a` - Allow A record IPs
- `mx` - Allow MX record IPs
- `~all` - Soft fail for others (recommended for testing)
- Use `-all` for strict enforcement once tested

---

### 2. **DMARC Record** (Email Authentication Policy)
**What it does:** Tells email providers what to do with emails that fail authentication.

**Add this DNS record:**
```
Type: TXT
Host: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:postmaster@sungur-electronics.com; pct=100
```

**Explanation:**
- `p=quarantine` - Put suspicious emails in spam (safer than reject)
- `rua=mailto:...` - Send aggregate reports here
- `pct=100` - Apply policy to 100% of emails

**Start with this, then upgrade later:**
```
v=DMARC1; p=none; rua=mailto:postmaster@sungur-electronics.com
```
This monitors without blocking, good for testing.

---

### 3. **Reverse DNS (PTR Record)**
**What it does:** Confirms your server IP matches your domain.

**Action Required:** Contact your hosting provider (VPS/dedicated server provider) and request:
```
PTR Record for IP YOUR_SERVER_IP -> mail.sungur-electronics.com
```

**Check if it's set:**
```bash
dig -x YOUR_SERVER_IP +short
```

**Should return:** `mail.sungur-electronics.com`

⚠️ **Critical:** Most hosting providers require you to open a support ticket for this.

---

### 4. **DKIM Email Signing** (Advanced but Recommended)
**What it does:** Digitally signs your emails to prove they're really from you.

**Setup Steps:**

#### Step 1: Install DKIM tools
```bash
sudo apt-get update
sudo apt-get install opendkim opendkim-tools -y
```

#### Step 2: Generate DKIM keys
```bash
sudo mkdir -p /etc/opendkim/keys/sungur-electronics.com
cd /etc/opendkim/keys/sungur-electronics.com
sudo opendkim-genkey -s default -d sungur-electronics.com
sudo chown opendkim:opendkim default.private
```

#### Step 3: Get your DNS record
```bash
sudo cat default.txt
```

You'll see something like:
```
default._domainkey	IN	TXT	( "v=DKIM1; k=rsa; p=MIGfMA0GCS..." )
```

#### Step 4: Add to DNS
```
Type: TXT
Host: default._domainkey
Value: v=DKIM1; k=rsa; p=MIGfMA0GCS... (the long key)
```

#### Step 5: Configure Postfix (if using Postfix)
Edit `/etc/opendkim.conf`:
```bash
Domain                  sungur-electronics.com
KeyFile                 /etc/opendkim/keys/sungur-electronics.com/default.private
Selector                default
```

Edit `/etc/postfix/main.cf`:
```bash
# DKIM
milter_default_action = accept
milter_protocol = 2
smtpd_milters = inet:localhost:8891
non_smtpd_milters = inet:localhost:8891
```

Restart services:
```bash
sudo systemctl restart opendkim
sudo systemctl restart postfix
```

---

## 🔍 Testing Your Configuration

### 1. **Check DNS Records Online**
Visit: https://mxtoolbox.com/SuperTool.aspx
- Enter: `sungur-electronics.com`
- Check: SPF, DMARC, MX records

### 2. **Test Email Deliverability**
Send a test email to:
- **mail-tester.com**: https://www.mail-tester.com
  - Get an email address from the site
  - Send from your contact form
  - Get a score (aim for 10/10)

- **Port25 Auth Checker**:
  - Send email to: `check-auth@verifier.port25.com`
  - Receive automated authentication report

### 3. **Check Blacklist Status**
Visit: https://mxtoolbox.com/blacklists.aspx
- Enter your server IP
- Check if you're on any blacklists
- If listed, request removal from each list

---

## 📝 Complete DNS Setup Checklist

Add these records to your DNS (via your domain registrar or DNS provider):

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | YOUR_SERVER_IP | 3600 |
| A | mail | YOUR_SERVER_IP | 3600 |
| MX | @ | 10 mail.sungur-electronics.com | 3600 |
| TXT | @ | v=spf1 ip4:YOUR_SERVER_IP a mx ~all | 3600 |
| TXT | _dmarc | v=DMARC1; p=quarantine; rua=mailto:postmaster@sungur-electronics.com | 3600 |
| TXT | default._domainkey | v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY | 3600 |

**After adding DNS records, wait 24-48 hours for full propagation.**

---

## 🚀 Best Practices for Email Deliverability

### Do's:
✅ Use a consistent "From" address (e.g., noreply@sungur-electronics.com)
✅ Include unsubscribe links if sending newsletters
✅ Keep your mail server updated and secure
✅ Use SSL/TLS for email transmission
✅ Monitor DMARC reports regularly
✅ Maintain low complaint rates
✅ Send emails regularly (not in sudden bursts)
✅ Authenticate all outgoing emails

### Don'ts:
❌ Don't use free email services for business emails
❌ Don't send from generic Gmail/Yahoo addresses
❌ Don't buy email lists
❌ Don't use spam trigger words excessively
❌ Don't send mass emails without authentication
❌ Don't ignore bounce rates
❌ Don't change your sending domain frequently

---

## 🛠️ Running the Automated Check Script

Make the script executable and run it:
```bash
cd /home/user/basic-build-boss
chmod +x email-reputation-setup.sh
./email-reputation-setup.sh
```

This will check your current configuration and provide recommendations.

---

## 📈 Monitoring Your Reputation

### Weekly Tasks:
- Check mail-tester.com score
- Review DMARC reports
- Monitor bounce rates
- Check blacklist status

### Monthly Tasks:
- Review email delivery metrics
- Update security patches
- Clean email lists (remove bounces)
- Test email authentication

### Tools to Bookmark:
- **MXToolbox**: https://mxtoolbox.com
- **Mail Tester**: https://www.mail-tester.com
- **Google Postmaster**: https://postmaster.google.com
- **DMARC Analyzer**: https://dmarc.org/resources/

---

## 🔧 Advanced: Mail Server Hardening

### Postfix Security Configuration
Add to `/etc/postfix/main.cf`:
```bash
# Security
smtpd_helo_required = yes
smtpd_helo_restrictions = permit_mynetworks, reject_invalid_helo_hostname, reject_non_fqdn_helo_hostname
smtpd_sender_restrictions = permit_mynetworks, reject_non_fqdn_sender, reject_unknown_sender_domain
smtpd_recipient_restrictions = permit_mynetworks, reject_unauth_destination, reject_non_fqdn_recipient

# TLS/SSL
smtpd_use_tls = yes
smtpd_tls_cert_file = /etc/ssl/certs/ssl-cert-snakeoil.pem
smtpd_tls_key_file = /etc/ssl/private/ssl-cert-snakeoil.key
smtpd_tls_security_level = may
smtpd_tls_protocols = !SSLv2, !SSLv3, !TLSv1, !TLSv1.1
smtpd_tls_ciphers = high
smtpd_tls_mandatory_ciphers = high

# Rate limiting
smtpd_client_connection_rate_limit = 10
smtpd_error_sleep_time = 1s
smtpd_soft_error_limit = 10
smtpd_hard_error_limit = 20
```

Reload Postfix:
```bash
sudo postfix reload
```

---

## 🆘 Troubleshooting Common Issues

### Issue: Emails go to spam
**Solutions:**
1. Check SPF/DKIM/DMARC are properly set
2. Verify reverse DNS is configured
3. Check you're not on blacklists
4. Improve email content (avoid spam words)
5. Use authenticated SMTP

### Issue: High bounce rate
**Solutions:**
1. Verify email addresses before sending
2. Use double opt-in for subscriptions
3. Clean your email list regularly
4. Check mail server logs for errors

### Issue: Listed on blacklist
**Solutions:**
1. Find out why (check mail logs)
2. Fix the security issue
3. Request delisting from each blacklist
4. Implement rate limiting
5. Secure your server against spam relaying

### Issue: DMARC failures
**Solutions:**
1. Check SPF alignment
2. Verify DKIM signing is working
3. Review DMARC reports for patterns
4. Ensure "From" domain matches sending domain

---

## 📞 Getting Help

If you encounter issues:
1. Check mail server logs: `tail -f /var/log/mail.log`
2. Test configuration: `./email-reputation-setup.sh`
3. Review DMARC reports sent to postmaster@
4. Contact your hosting provider for PTR/DNS help
5. Use online testing tools to identify issues

---

## ✅ Final Checklist

Before going live, verify:
- [ ] SPF record added to DNS
- [ ] DMARC record added to DNS
- [ ] DKIM keys generated and DNS record added
- [ ] Reverse DNS (PTR) configured by hosting provider
- [ ] Mail server hostname properly set
- [ ] SSL/TLS enabled for mail server
- [ ] Test email sent to mail-tester.com (score 8+/10)
- [ ] Not listed on major blacklists
- [ ] Contact form tested and working
- [ ] DMARC reports receiving address set up

---

## 🎓 Additional Resources

- **SPF Wizard**: https://www.spfwizard.net/
- **DMARC Guide**: https://dmarc.org/overview/
- **DKIM Setup**: https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-dkim-with-postfix-on-debian-wheezy
- **Google Email Best Practices**: https://support.google.com/mail/answer/81126
- **Microsoft Email Authentication**: https://docs.microsoft.com/en-us/microsoft-365/security/office-365-security/email-authentication-about

---

*Last updated: April 2026*
*For: sungur-electronics.com*
