#!/bin/bash

# ============================================================================
# Domain Reputation Enhancement Script for sungur-electronics.com
# ============================================================================
# This script helps check and improve email deliverability and domain reputation
# Run this on your mail server or web server
# ============================================================================

DOMAIN="sungur-electronics.com"
SERVER_IP=$(curl -s ifconfig.me)

echo "=========================================="
echo "Email Reputation Checker for $DOMAIN"
echo "Server IP: $SERVER_IP"
echo "=========================================="
echo ""

# 1. Check current DNS records
echo "1. Checking Current DNS Records..."
echo "-----------------------------------"
echo ""

echo "A Record:"
dig +short A $DOMAIN
echo ""

echo "MX Records:"
dig +short MX $DOMAIN
echo ""

echo "SPF Record (TXT):"
dig +short TXT $DOMAIN | grep "v=spf1"
echo ""

echo "DKIM Record (check for default selector):"
dig +short TXT default._domainkey.$DOMAIN
echo ""

echo "DMARC Record:"
dig +short TXT _dmarc.$DOMAIN
echo ""

# 2. Check reverse DNS
echo "2. Checking Reverse DNS (PTR)..."
echo "-----------------------------------"
REVERSE_DNS=$(dig +short -x $SERVER_IP)
echo "Server IP: $SERVER_IP"
echo "Reverse DNS: $REVERSE_DNS"
if [[ "$REVERSE_DNS" == *"$DOMAIN"* ]]; then
    echo "✅ Reverse DNS is properly configured"
else
    echo "⚠️  WARNING: Reverse DNS does not match your domain"
    echo "   Contact your hosting provider to set PTR record:"
    echo "   $SERVER_IP -> mail.$DOMAIN"
fi
echo ""

# 3. Check if server is on blacklists
echo "3. Checking Email Blacklists..."
echo "-----------------------------------"
echo "Checking major blacklists for IP: $SERVER_IP"
echo ""

# Check major blacklists
BLACKLISTS=(
    "zen.spamhaus.org"
    "bl.spamcop.net"
    "b.barracudacentral.org"
    "dnsbl.sorbs.net"
)

for bl in "${BLACKLISTS[@]}"; do
    REVERSED_IP=$(echo $SERVER_IP | awk -F. '{print $4"."$3"."$2"."$1}')
    LISTED=$(dig +short $REVERSED_IP.$bl)
    if [ -z "$LISTED" ]; then
        echo "✅ Not listed on $bl"
    else
        echo "❌ LISTED on $bl - Result: $LISTED"
    fi
done
echo ""

# 4. Generate recommended DNS records
echo "4. Recommended DNS Records to Add"
echo "-----------------------------------"
echo ""

echo "📝 SPF Record (Sender Policy Framework):"
echo "Type: TXT"
echo "Host: @"
echo "Value: v=spf1 ip4:$SERVER_IP a mx ~all"
echo ""

echo "📝 DMARC Record (Email Authentication):"
echo "Type: TXT"
echo "Host: _dmarc"
echo "Value: v=DMARC1; p=quarantine; rua=mailto:postmaster@$DOMAIN; pct=100; adkim=s; aspf=s"
echo ""

echo "📝 MX Record (if not set):"
echo "Type: MX"
echo "Host: @"
echo "Value: 10 mail.$DOMAIN"
echo ""

echo "📝 Reverse DNS / PTR Record (Contact your hosting provider):"
echo "IP: $SERVER_IP"
echo "Points to: mail.$DOMAIN"
echo ""

# 5. Check mail server configuration
echo "5. Mail Server Configuration Check"
echo "-----------------------------------"
echo ""

if command -v postconf &> /dev/null; then
    echo "Postfix detected. Current configuration:"
    echo "myhostname = $(postconf -h myhostname)"
    echo "mydomain = $(postconf -h mydomain)"
    echo "myorigin = $(postconf -h myorigin)"
    echo ""
elif command -v exim &> /dev/null; then
    echo "Exim detected."
    echo "Primary hostname: $(exim -bP primary_hostname)"
    echo ""
elif [ -f "/usr/sbin/sendmail" ]; then
    echo "Sendmail detected."
    echo ""
fi

# 6. Test email sending
echo "6. Email Deliverability Testing Tools"
echo "-----------------------------------"
echo ""
echo "🔍 Test your email deliverability at:"
echo "   • https://www.mail-tester.com"
echo "   • https://mxtoolbox.com/emailhealth/"
echo "   • https://www.appmaildev.com/en/dkim"
echo ""
echo "Send a test email to:"
echo "   check-auth@verifier.port25.com"
echo "   (You'll receive an automated report)"
echo ""

# 7. DKIM Setup Guide
echo "7. DKIM Setup (Advanced - Optional but Recommended)"
echo "-----------------------------------"
echo ""
echo "To set up DKIM signing, you need to:"
echo "1. Install opendkim package"
echo "2. Generate DKIM keys"
echo "3. Configure mail server to sign emails"
echo "4. Add DKIM public key to DNS"
echo ""
echo "Run this to install DKIM tools:"
echo "   sudo apt-get install opendkim opendkim-tools -y"
echo ""
echo "Generate DKIM keys:"
echo "   sudo opendkim-genkey -s default -d $DOMAIN"
echo "   sudo cat default.txt  # This is your DNS record"
echo ""

# 8. Summary and Action Items
echo ""
echo "=========================================="
echo "SUMMARY & ACTION ITEMS"
echo "=========================================="
echo ""
echo "✅ QUICK WINS (Do these first):"
echo "   1. Add SPF record to DNS"
echo "   2. Add DMARC record to DNS"
echo "   3. Set up reverse DNS (PTR) with hosting provider"
echo ""
echo "🚀 ADVANCED (For better deliverability):"
echo "   4. Set up DKIM email signing"
echo "   5. Configure proper mail server hostname"
echo "   6. Test emails at mail-tester.com (aim for 10/10 score)"
echo ""
echo "📊 MONITORING:"
echo "   7. Regularly check blacklist status"
echo "   8. Monitor DMARC reports"
echo "   9. Keep mail server updated and secure"
echo ""
echo "=========================================="
echo "Script completed!"
echo "=========================================="
