#!/bin/bash

# Logo Verification Script for CloudProInsights
# This script verifies that all logo files are accessible and properly formatted

set -e

echo "🔍 Verifying CloudProInsights logo files..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}[HEADER]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the CloudProInsights root directory."
    exit 1
fi

print_header "Checking logo file existence..."

# Define expected logo files (macOS compatible)
LOGO_FILES=(
    "aws:aws-logo.png"
    "azure:azure-logo.png"
    "gcp:gcp-logo.png"
    "oracle:oracle-logo.png"
    "ibm:ibm-logo.png"
)

# Check each logo file
for logo_entry in "${LOGO_FILES[@]}"; do
    provider=$(echo "$logo_entry" | cut -d: -f1)
    logo_file=$(echo "$logo_entry" | cut -d: -f2)
    logo_path="public/assets/logos/$logo_file"
    
    if [ -f "$logo_path" ]; then
        # Get file size
        file_size=$(stat -f%z "$logo_path" 2>/dev/null || stat -c%s "$logo_path" 2>/dev/null || echo "unknown")
        
        # Check if file is not empty
        if [ "$file_size" -gt 0 ] 2>/dev/null; then
            print_status "✅ $provider: $logo_file ($file_size bytes)"
        else
            print_error "❌ $provider: $logo_file (empty file)"
        fi
    else
        print_error "❌ $provider: $logo_file (missing)"
    fi
done

print_header "Checking logo file formats..."

# Check if files are valid images (basic check)
for logo_entry in "${LOGO_FILES[@]}"; do
    provider=$(echo "$logo_entry" | cut -d: -f1)
    logo_file=$(echo "$logo_entry" | cut -d: -f2)
    logo_path="public/assets/logos/$logo_file"
    
    if [ -f "$logo_path" ]; then
        # Check file header for PNG signature
        if command -v file >/dev/null 2>&1; then
            file_type=$(file "$logo_path" 2>/dev/null | grep -o "PNG image data" || echo "unknown")
            if [[ "$file_type" == "PNG image data" ]]; then
                print_status "✅ $provider: Valid PNG format"
            else
                print_warning "⚠️  $provider: May not be a valid PNG ($file_type)"
            fi
        else
            print_warning "⚠️  $provider: Cannot verify format (file command not available)"
        fi
    fi
done

print_header "Checking logo directory structure..."

# Verify directory structure
if [ -d "public/assets/logos" ]; then
    print_status "✅ Logo directory structure exists"
    echo "   Directory contents:"
    ls -la public/assets/logos/ | sed 's/^/   /'
else
    print_error "❌ Logo directory structure missing"
fi

print_header "Checking for hardcoded URLs in source code..."

# Search for any remaining hardcoded GitHub URLs
HARDCODED_URLS=$(grep -r "raw.githubusercontent.com.*CloudProInsights" src/ 2>/dev/null || true)

if [ -n "$HARDCODED_URLS" ]; then
    print_warning "⚠️  Found hardcoded GitHub URLs in source code:"
    echo "$HARDCODED_URLS" | sed 's/^/   /'
else
    print_status "✅ No hardcoded GitHub URLs found in source code"
fi

print_header "Logo accessibility test..."

# Test if logos can be accessed via relative paths
echo "Testing logo accessibility via relative paths:"
for logo_entry in "${LOGO_FILES[@]}"; do
    provider=$(echo "$logo_entry" | cut -d: -f1)
    logo_file=$(echo "$logo_entry" | cut -d: -f2)
    logo_path="public/assets/logos/$logo_file"
    
    if [ -f "$logo_path" ]; then
        # Check if file is readable
        if [ -r "$logo_path" ]; then
            print_status "✅ $provider: Readable via $logo_path"
        else
            print_error "❌ $provider: Not readable via $logo_path"
        fi
    fi
done

print_header "Summary"

# Count total and missing logos
total_logos=${#LOGO_FILES[@]}
missing_logos=0
for logo_entry in "${LOGO_FILES[@]}"; do
    provider=$(echo "$logo_entry" | cut -d: -f1)
    logo_file=$(echo "$logo_entry" | cut -d: -f2)
    logo_path="public/assets/logos/$logo_file"
    if [ ! -f "$logo_path" ]; then
        ((missing_logos++))
    fi
done

if [ $missing_logos -eq 0 ]; then
    print_status "🎉 All $total_logos logo files are present and accessible!"
    print_status "✅ Logo deployment should work correctly"
else
    print_error "❌ $missing_logos out of $total_logos logo files are missing"
    print_error "Please ensure all logo files are present before deployment"
    exit 1
fi

echo ""
print_status "🚀 Logo verification completed successfully!"
