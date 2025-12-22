#!/bin/bash

# Disk Space Analysis and Cleanup Script
# For servers with ploop devices (OpenVZ/Virtuozzo) and general Linux systems
# Version: 1.0

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
LARGE_FILE_SIZE="100M"  # Files larger than this will be reported
TOP_DIRS_COUNT=20       # Number of top directories to show
TOP_FILES_COUNT=20      # Number of top files to show

# Function to print colored output
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
check_root() {
    if [[ $EUID -ne 0 ]]; then
        print_warning "This script works better with root privileges."
        echo "Some operations may be limited. Continue? (y/n)"
        read -r response
        if [[ ! "$response" =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# Analyze overall disk usage
analyze_disk_usage() {
    print_header "CURRENT DISK USAGE"
    df -h

    echo ""
    print_header "DISK USAGE BY PARTITION"
    df -h | awk 'NR==1 || /ploop/ || $5+0 > 50' | grep -v "tmpfs" || df -h | awk 'NR==1 || $5+0 > 50'
}

# Find largest directories
find_largest_dirs() {
    print_header "TOP $TOP_DIRS_COUNT LARGEST DIRECTORIES"
    print_warning "This may take a few minutes..."

    echo -e "\nScanning root directories..."
    du -h --max-depth=1 / 2>/dev/null | sort -hr | head -n "$TOP_DIRS_COUNT" || true

    echo -e "\nScanning /var (common culprit)..."
    du -h --max-depth=2 /var 2>/dev/null | sort -hr | head -n 15 || true

    echo -e "\nScanning /home..."
    du -h --max-depth=2 /home 2>/dev/null | sort -hr | head -n 15 || true
}

# Find largest files
find_largest_files() {
    print_header "TOP $TOP_FILES_COUNT LARGEST FILES (>$LARGE_FILE_SIZE)"
    print_warning "This may take several minutes..."

    find / -type f -size +"$LARGE_FILE_SIZE" -exec ls -lh {} \; 2>/dev/null | \
        awk '{ print $5 "\t" $9 }' | \
        sort -hr | \
        head -n "$TOP_FILES_COUNT" || true
}

# Check log files
check_log_files() {
    print_header "LOG FILES ANALYSIS"

    if [ -d /var/log ]; then
        echo "Total log directory size:"
        du -sh /var/log 2>/dev/null || true

        echo -e "\nLargest log files:"
        find /var/log -type f -exec ls -lh {} \; 2>/dev/null | \
            awk '{ print $5 "\t" $9 }' | \
            sort -hr | \
            head -n 10 || true

        echo -e "\nLargest log directories:"
        du -h --max-depth=2 /var/log 2>/dev/null | sort -hr | head -n 10 || true
    fi
}

# Check Docker usage
check_docker() {
    print_header "DOCKER DISK USAGE"

    if command -v docker &> /dev/null; then
        docker system df 2>/dev/null || print_warning "Docker command failed or requires sudo"

        echo -e "\nDocker images:"
        docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}" 2>/dev/null || true

        echo -e "\nStopped containers:"
        docker ps -a --filter "status=exited" --format "table {{.Names}}\t{{.Image}}\t{{.Status}}" 2>/dev/null || true
    else
        print_warning "Docker is not installed or not in PATH"
    fi
}

# Check package manager caches
check_package_caches() {
    print_header "PACKAGE MANAGER CACHES"

    # APT cache (Debian/Ubuntu)
    if [ -d /var/cache/apt ]; then
        echo "APT cache size:"
        du -sh /var/cache/apt 2>/dev/null || true
    fi

    # YUM cache (RHEL/CentOS)
    if [ -d /var/cache/yum ]; then
        echo "YUM cache size:"
        du -sh /var/cache/yum 2>/dev/null || true
    fi

    # DNF cache (Fedora/newer RHEL)
    if [ -d /var/cache/dnf ]; then
        echo "DNF cache size:"
        du -sh /var/cache/dnf 2>/dev/null || true
    fi

    # npm cache
    if [ -d ~/.npm ]; then
        echo "NPM cache size:"
        du -sh ~/.npm 2>/dev/null || true
    fi

    # pip cache
    if [ -d ~/.cache/pip ]; then
        echo "PIP cache size:"
        du -sh ~/.cache/pip 2>/dev/null || true
    fi
}

# Check temporary files
check_temp_files() {
    print_header "TEMPORARY FILES"

    if [ -d /tmp ]; then
        echo "/tmp size:"
        du -sh /tmp 2>/dev/null || true
        echo "Files in /tmp:"
        ls -lah /tmp 2>/dev/null | wc -l
    fi

    if [ -d /var/tmp ]; then
        echo -e "\n/var/tmp size:"
        du -sh /var/tmp 2>/dev/null || true
        echo "Files in /var/tmp:"
        ls -lah /var/tmp 2>/dev/null | wc -l
    fi
}

# Check old kernels (Debian/Ubuntu)
check_old_kernels() {
    print_header "OLD KERNEL PACKAGES"

    if command -v dpkg &> /dev/null; then
        current_kernel=$(uname -r)
        echo "Current kernel: $current_kernel"
        echo -e "\nInstalled kernels:"
        dpkg -l | grep linux-image | awk '{print $2}' || true
    elif command -v rpm &> /dev/null; then
        current_kernel=$(uname -r)
        echo "Current kernel: $current_kernel"
        echo -e "\nInstalled kernels:"
        rpm -qa | grep kernel || true
    fi
}

# Interactive cleanup menu
cleanup_menu() {
    print_header "CLEANUP OPTIONS"

    echo "What would you like to clean up?"
    echo ""
    echo "1) Clean APT cache (apt-get clean)"
    echo "2) Clean YUM/DNF cache"
    echo "3) Clean old log files (older than 30 days in /var/log)"
    echo "4) Clean Docker (remove unused images, containers, volumes)"
    echo "5) Clean npm cache"
    echo "6) Clean pip cache"
    echo "7) Clean /tmp directory"
    echo "8) Remove old kernels (CAUTION!)"
    echo "9) Clean all safe options (1,2,5,6,7)"
    echo "10) Custom cleanup (I'll guide you)"
    echo "0) Exit cleanup menu"
    echo ""
    read -p "Enter your choice (0-10): " choice

    case $choice in
        1)
            if command -v apt-get &> /dev/null; then
                echo "Running apt-get clean..."
                apt-get clean && print_success "APT cache cleaned"
                apt-get autoclean && print_success "APT autoclean completed"
                apt-get autoremove -y && print_success "Unused packages removed"
            else
                print_error "APT not found"
            fi
            ;;
        2)
            if command -v yum &> /dev/null; then
                yum clean all && print_success "YUM cache cleaned"
            elif command -v dnf &> /dev/null; then
                dnf clean all && print_success "DNF cache cleaned"
            else
                print_error "YUM/DNF not found"
            fi
            ;;
        3)
            echo "Cleaning old log files..."
            find /var/log -type f -name "*.log" -mtime +30 -exec rm -f {} \; 2>/dev/null && print_success "Old log files removed"
            find /var/log -type f -name "*.gz" -mtime +30 -exec rm -f {} \; 2>/dev/null && print_success "Old compressed logs removed"
            ;;
        4)
            if command -v docker &> /dev/null; then
                echo "Docker cleanup..."
                docker system prune -a --volumes -f && print_success "Docker cleanup completed"
            else
                print_error "Docker not found"
            fi
            ;;
        5)
            if command -v npm &> /dev/null; then
                npm cache clean --force && print_success "NPM cache cleaned"
            else
                print_error "NPM not found"
            fi
            ;;
        6)
            if command -v pip &> /dev/null; then
                pip cache purge 2>/dev/null && print_success "PIP cache cleaned"
            elif command -v pip3 &> /dev/null; then
                pip3 cache purge 2>/dev/null && print_success "PIP3 cache cleaned"
            else
                print_error "PIP not found"
            fi
            ;;
        7)
            echo "Cleaning /tmp..."
            find /tmp -type f -atime +7 -delete 2>/dev/null && print_success "/tmp cleaned"
            ;;
        8)
            print_warning "This will remove old kernels. Make sure you keep at least the current one!"
            read -p "Are you sure? (yes/no): " confirm
            if [ "$confirm" = "yes" ]; then
                if command -v apt-get &> /dev/null; then
                    apt-get autoremove --purge -y && print_success "Old kernels removed"
                else
                    print_warning "Auto kernel removal only supported on Debian/Ubuntu"
                fi
            fi
            ;;
        9)
            echo "Running all safe cleanup options..."

            # APT
            if command -v apt-get &> /dev/null; then
                apt-get clean && apt-get autoclean && print_success "APT cleaned"
            fi

            # YUM/DNF
            if command -v yum &> /dev/null; then
                yum clean all && print_success "YUM cleaned"
            elif command -v dnf &> /dev/null; then
                dnf clean all && print_success "DNF cleaned"
            fi

            # NPM
            if command -v npm &> /dev/null; then
                npm cache clean --force && print_success "NPM cache cleaned"
            fi

            # PIP
            if command -v pip &> /dev/null; then
                pip cache purge 2>/dev/null && print_success "PIP cache cleaned"
            fi

            # /tmp
            find /tmp -type f -atime +7 -delete 2>/dev/null && print_success "/tmp cleaned"

            print_success "All safe cleanup operations completed!"
            ;;
        10)
            custom_cleanup
            ;;
        0)
            echo "Exiting cleanup menu"
            return
            ;;
        *)
            print_error "Invalid choice"
            ;;
    esac

    echo ""
    echo "Press Enter to return to cleanup menu, or Ctrl+C to exit"
    read
    cleanup_menu
}

# Custom cleanup guidance
custom_cleanup() {
    print_header "CUSTOM CLEANUP GUIDANCE"

    echo "Here are some manual cleanup commands you can run:"
    echo ""
    echo "1. Find and delete files by pattern:"
    echo "   find /path -name '*.log' -mtime +30 -delete"
    echo ""
    echo "2. Clean journal logs (systemd):"
    echo "   journalctl --vacuum-time=7d"
    echo ""
    echo "3. Find files owned by specific user:"
    echo "   find / -user username -ls"
    echo ""
    echo "4. Clean build artifacts in current project:"
    echo "   rm -rf node_modules dist build .cache"
    echo ""
    echo "5. Find duplicate files:"
    echo "   fdupes -r /path"
    echo ""
    echo "6. Clean package manager specific:"
    echo "   apt-get autoremove --purge (Debian/Ubuntu)"
    echo "   yum autoremove (RHEL/CentOS)"
    echo "   package-cleanup --oldkernels --count=2 (RHEL/CentOS)"
    echo ""
}

# Generate detailed report
generate_report() {
    print_header "GENERATING DETAILED REPORT"

    REPORT_FILE="disk-analysis-$(date +%Y%m%d-%H%M%S).txt"

    {
        echo "Disk Space Analysis Report"
        echo "Generated: $(date)"
        echo "Hostname: $(hostname)"
        echo "================================"
        echo ""

        echo "DISK USAGE:"
        df -h
        echo ""

        echo "LARGEST DIRECTORIES:"
        du -h --max-depth=1 / 2>/dev/null | sort -hr | head -n 20
        echo ""

        echo "LARGEST FILES:"
        find / -type f -size +"$LARGE_FILE_SIZE" -exec ls -lh {} \; 2>/dev/null | \
            awk '{ print $5 "\t" $9 }' | sort -hr | head -n 20
        echo ""

        echo "LOG FILES:"
        du -sh /var/log 2>/dev/null
        echo ""

        echo "PACKAGE CACHES:"
        du -sh /var/cache/apt 2>/dev/null || echo "No APT cache"
        du -sh /var/cache/yum 2>/dev/null || echo "No YUM cache"
        du -sh ~/.npm 2>/dev/null || echo "No NPM cache"
        echo ""

    } > "$REPORT_FILE"

    print_success "Report saved to: $REPORT_FILE"
}

# Main menu
main_menu() {
    clear
    echo -e "${GREEN}"
    echo "╔════════════════════════════════════════╗"
    echo "║   DISK SPACE ANALYZER & CLEANUP        ║"
    echo "║   For Linux Servers (including ploop)  ║"
    echo "╚════════════════════════════════════════╝"
    echo -e "${NC}"

    echo "Select an option:"
    echo ""
    echo "1) Quick Analysis (disk usage overview)"
    echo "2) Full Analysis (detailed scan - may take time)"
    echo "3) Interactive Cleanup"
    echo "4) Generate Report File"
    echo "5) Exit"
    echo ""
    read -p "Enter your choice (1-5): " main_choice

    case $main_choice in
        1)
            analyze_disk_usage
            check_log_files
            check_package_caches
            check_temp_files
            echo ""
            echo "Press Enter to continue..."
            read
            main_menu
            ;;
        2)
            analyze_disk_usage
            find_largest_dirs
            find_largest_files
            check_log_files
            check_docker
            check_package_caches
            check_temp_files
            check_old_kernels
            echo ""
            echo "Press Enter to continue..."
            read
            main_menu
            ;;
        3)
            cleanup_menu
            main_menu
            ;;
        4)
            generate_report
            echo ""
            echo "Press Enter to continue..."
            read
            main_menu
            ;;
        5)
            print_success "Goodbye!"
            exit 0
            ;;
        *)
            print_error "Invalid choice"
            sleep 2
            main_menu
            ;;
    esac
}

# Script entry point
echo "Disk Space Analysis and Cleanup Tool"
echo "====================================="
check_root
main_menu
