#!/bin/bash

# cPanel Server Disk Cleanup and Maintenance Script
# Specifically designed for cPanel servers with user accounts
# Version: 1.0

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ERROR_LOG_SIZE="10M"    # Delete error_log files larger than this
APACHE_ARCHIVE_DAYS=90  # Keep Apache archives for this many days
LOG_ARCHIVE_DAYS=90     # Keep general log archives for this many days
MUNIN_DAYS=30          # Keep Munin logs for this many days

print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
    print_error "This script must be run as root"
    exit 1
fi

print_header "cPanel Server Disk Cleanup"
echo "Starting cleanup process..."
echo "Date: $(date)"
echo ""

# Show current disk usage
print_header "CURRENT DISK USAGE"
df -h /
CURRENT_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
echo "Current usage: ${CURRENT_USAGE}%"

# Analysis mode
if [ "$1" = "--analyze" ] || [ "$1" = "-a" ]; then
    print_header "ANALYSIS MODE - No files will be deleted"

    echo "Large error_log files that WOULD be deleted:"
    find /home/*/public_html -name "error_log" -size +${ERROR_LOG_SIZE} -exec ls -lh {} \; 2>/dev/null | awk '{print $5 "\t" $9}' || echo "None found"

    echo -e "\nOld Apache archives that WOULD be deleted (>${APACHE_ARCHIVE_DAYS} days):"
    find /var/log/apache2/archive/ -name "*.gz" -mtime +${APACHE_ARCHIVE_DAYS} -ls 2>/dev/null | wc -l | xargs echo "Files:"

    echo -e "\nOld log archives that WOULD be deleted (>${LOG_ARCHIVE_DAYS} days):"
    find /var/log/archive/ -name "*.gz" -mtime +${LOG_ARCHIVE_DAYS} -ls 2>/dev/null | wc -l | xargs echo "Files:"

    echo -e "\nTop 10 largest user directories:"
    du -sh /home/* 2>/dev/null | sort -hr | head -10

    echo -e "\nTop 10 largest error_log files:"
    find /home/*/public_html -name "error_log" -exec ls -lh {} \; 2>/dev/null | sort -k5 -hr | head -10

    exit 0
fi

# Cleanup mode
print_header "CLEANUP: Large error_log Files"
echo "Finding error_log files larger than ${ERROR_LOG_SIZE}..."
ERROR_LOG_COUNT=$(find /home/*/public_html -name "error_log" -size +${ERROR_LOG_SIZE} 2>/dev/null | wc -l)

if [ $ERROR_LOG_COUNT -gt 0 ]; then
    echo "Found $ERROR_LOG_COUNT large error_log files"
    find /home/*/public_html -name "error_log" -size +${ERROR_LOG_SIZE} -exec ls -lh {} \; 2>/dev/null | awk '{print "  " $5 "\t" $9}'

    read -p "Delete these error_log files? (y/n): " confirm
    if [ "$confirm" = "y" ]; then
        find /home/*/public_html -name "error_log" -size +${ERROR_LOG_SIZE} -delete 2>/dev/null
        print_success "Deleted $ERROR_LOG_COUNT error_log files"

        # Make error_log files immutable to prevent regrowth
        print_warning "Creating immutable error_log files to prevent regrowth..."
        find /home/*/public_html -type d | while read dir; do
            if [ -d "$dir" ] && [ ! -f "$dir/error_log" ]; then
                touch "$dir/error_log" 2>/dev/null
                chmod 444 "$dir/error_log" 2>/dev/null
                chattr +i "$dir/error_log" 2>/dev/null
            fi
        done
        print_success "Protected error_log files from regrowth"
    fi
else
    print_success "No large error_log files found"
fi

print_header "CLEANUP: Old Apache Archive Logs"
if [ -d /var/log/apache2/archive/ ]; then
    APACHE_COUNT=$(find /var/log/apache2/archive/ -name "*.gz" -mtime +${APACHE_ARCHIVE_DAYS} 2>/dev/null | wc -l)
    if [ $APACHE_COUNT -gt 0 ]; then
        echo "Found $APACHE_COUNT Apache archives older than ${APACHE_ARCHIVE_DAYS} days"
        read -p "Delete old Apache archives? (y/n): " confirm
        if [ "$confirm" = "y" ]; then
            find /var/log/apache2/archive/ -name "*.gz" -mtime +${APACHE_ARCHIVE_DAYS} -delete 2>/dev/null
            print_success "Deleted $APACHE_COUNT old Apache archives"
        fi
    else
        print_success "No old Apache archives to delete"
    fi
else
    print_warning "Apache archive directory not found"
fi

print_header "CLEANUP: Old Log Archives"
if [ -d /var/log/archive/ ]; then
    ARCHIVE_COUNT=$(find /var/log/archive/ -name "*.gz" -mtime +${LOG_ARCHIVE_DAYS} 2>/dev/null | wc -l)
    if [ $ARCHIVE_COUNT -gt 0 ]; then
        echo "Found $ARCHIVE_COUNT log archives older than ${LOG_ARCHIVE_DAYS} days"
        read -p "Delete old log archives? (y/n): " confirm
        if [ "$confirm" = "y" ]; then
            find /var/log/archive/ -name "*.gz" -mtime +${LOG_ARCHIVE_DAYS} -delete 2>/dev/null
            print_success "Deleted $ARCHIVE_COUNT old log archives"
        fi
    else
        print_success "No old log archives to delete"
    fi
fi

print_header "CLEANUP: Munin Logs"
if [ -d /var/log/munin/ ]; then
    echo "Cleaning Munin logs older than ${MUNIN_DAYS} days..."
    find /var/log/munin/ -type f -mtime +${MUNIN_DAYS} -delete 2>/dev/null
    print_success "Munin logs cleaned"
fi

print_header "CLEANUP: YUM Cache"
yum clean all > /dev/null 2>&1
print_success "YUM cache cleaned"

print_header "CLEANUP: Temporary Files"
echo "Cleaning old temporary files (>7 days)..."
find /tmp -type f -atime +7 -delete 2>/dev/null
find /var/tmp -type f -atime +7 -delete 2>/dev/null
print_success "Temporary files cleaned"

# Show final disk usage
print_header "FINAL DISK USAGE"
df -h /
NEW_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
FREED=$((CURRENT_USAGE - NEW_USAGE))

echo ""
if [ $FREED -gt 0 ]; then
    print_success "Freed approximately ${FREED}% disk space!"
    print_success "Before: ${CURRENT_USAGE}% → After: ${NEW_USAGE}%"
else
    print_warning "No significant space freed. Run with --analyze to see what can be cleaned."
fi

print_header "RECOMMENDATIONS"
echo "1. Run this script monthly: 0 2 1 * * /root/cpanel-disk-cleanup.sh"
echo "2. Monitor user mail directories regularly"
echo "3. Set up email quotas in WHM"
echo "4. Enable cPanel disk usage warnings"
echo "5. Consider implementing PHP error_log rotation"

echo ""
print_success "Cleanup completed successfully!"
