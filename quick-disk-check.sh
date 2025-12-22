#!/bin/bash

# Quick Disk Space Check Script
# A simplified version for quick checks without interactive menu

echo "==================================="
echo "QUICK DISK SPACE CHECK"
echo "==================================="
echo ""

echo "📊 CURRENT DISK USAGE:"
echo "-----------------------------------"
df -h
echo ""

echo "🔍 CHECKING COMMON PROBLEM AREAS:"
echo "-----------------------------------"

echo ""
echo "📁 Log files size:"
if [ -d /var/log ]; then
    du -sh /var/log 2>/dev/null || echo "Cannot access /var/log"
    echo "  Top 5 largest log files:"
    find /var/log -type f -exec ls -lh {} \; 2>/dev/null | \
        awk '{ print "  " $5 "\t" $9 }' | \
        sort -hr | \
        head -n 5 || echo "  Cannot list log files"
else
    echo "  /var/log not found"
fi

echo ""
echo "📦 Package caches:"
[ -d /var/cache/apt ] && du -sh /var/cache/apt 2>/dev/null && echo "  APT cache: $(du -sh /var/cache/apt 2>/dev/null | awk '{print $1}')"
[ -d /var/cache/yum ] && du -sh /var/cache/yum 2>/dev/null && echo "  YUM cache: $(du -sh /var/cache/yum 2>/dev/null | awk '{print $1}')"
[ -d /var/cache/dnf ] && du -sh /var/cache/dnf 2>/dev/null && echo "  DNF cache: $(du -sh /var/cache/dnf 2>/dev/null | awk '{print $1}')"
[ -d ~/.npm ] && du -sh ~/.npm 2>/dev/null && echo "  NPM cache: $(du -sh ~/.npm 2>/dev/null | awk '{print $1}')"

echo ""
echo "🗑️  Temporary files:"
[ -d /tmp ] && echo "  /tmp: $(du -sh /tmp 2>/dev/null | awk '{print $1}')"
[ -d /var/tmp ] && echo "  /var/tmp: $(du -sh /var/tmp 2>/dev/null | awk '{print $1}')"

echo ""
echo "📂 Top 10 largest directories in root:"
echo "-----------------------------------"
du -h --max-depth=1 / 2>/dev/null | sort -hr | head -n 10

echo ""
echo "💾 Top 10 largest files (>100MB):"
echo "-----------------------------------"
find / -type f -size +100M -exec ls -lh {} \; 2>/dev/null | \
    awk '{ print $5 "\t" $9 }' | \
    sort -hr | \
    head -n 10 || echo "No large files found or permission denied"

echo ""
echo "🐳 Docker usage (if installed):"
echo "-----------------------------------"
if command -v docker &> /dev/null; then
    docker system df 2>/dev/null || echo "Docker installed but cannot access (try with sudo)"
else
    echo "Docker not installed"
fi

echo ""
echo "==================================="
echo "✅ Quick check complete!"
echo ""
echo "💡 For detailed analysis and cleanup options, run:"
echo "   sudo ./disk-cleanup.sh"
echo "==================================="
