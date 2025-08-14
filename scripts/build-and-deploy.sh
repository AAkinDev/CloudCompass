#!/bin/bash

# CloudProInsights Build and Deploy Script
# This script ensures proper asset handling and deployment

set -e  # Exit on any error

echo "🚀 Starting CloudProInsights build and deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the CloudProInsights root directory."
    exit 1
fi

print_status "Verifying project structure..."

# Ensure public directory exists
if [ ! -d "public" ]; then
    print_warning "Public directory not found. Creating..."
    mkdir -p public
fi

# Ensure assets/logos directory exists
if [ ! -d "public/assets/logos" ]; then
    print_warning "Logos directory not found. Creating..."
    mkdir -p public/assets/logos
fi

# Check if logo files exist
print_status "Checking logo files..."
LOGO_FILES=("aws-logo.png" "azure-logo.png" "gcp-logo.png" "oracle-logo.png" "ibm-logo.png")
MISSING_LOGOS=()

for logo in "${LOGO_FILES[@]}"; do
    if [ ! -f "public/assets/logos/$logo" ]; then
        MISSING_LOGOS+=("$logo")
        print_warning "Missing logo: $logo"
    else
        print_status "Found logo: $logo"
    fi
done

if [ ${#MISSING_LOGOS[@]} -gt 0 ]; then
    print_error "Missing logo files: ${MISSING_LOGOS[*]}"
    print_error "Please ensure all logo files are present in public/assets/logos/"
    exit 1
fi

# Install dependencies
print_status "Installing dependencies..."
npm ci

# Run tests
print_status "Running tests..."
npm test -- --watchAll=false --passWithNoTests

# Build the application
print_status "Building application..."
npm run build

# Verify build output
print_status "Verifying build output..."
if [ ! -d "build" ]; then
    print_error "Build directory not found after build process"
    exit 1
fi

if [ ! -f "build/index.html" ]; then
    print_error "build/index.html not found"
    exit 1
fi

# Check if assets were copied correctly
print_status "Checking build assets..."
if [ ! -d "build/assets/logos" ]; then
    print_warning "Build logos directory not found. Assets may not have been copied correctly."
else
    print_status "Build logos directory found"
    ls -la build/assets/logos/
fi

print_status "✅ Build completed successfully!"
print_status "Build directory contents:"
ls -la build/

print_status "🎯 Next steps:"
print_status "1. Commit and push your changes"
print_status "2. GitHub Actions will automatically deploy to GitHub Pages"
print_status "3. Check deployment status at: https://github.com/AAkinDev/CloudProInsights/actions"
print_status "4. Your site will be available at: https://aakindev.github.io/CloudProInsights"

echo ""
print_status "🚀 Ready for deployment!"
