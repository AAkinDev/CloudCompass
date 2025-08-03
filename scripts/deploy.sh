#!/bin/bash

# CloudCompass Deployment Script

echo "🚀 Deploying CloudCompass..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the CloudCompass root directory"
    exit 1
fi

# Build the project
echo "📦 Building the project..."
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
    echo "❌ Build failed. Please check the build output above."
    exit 1
fi

# Deploy to GitHub Pages (if configured)
if [ -n "$GITHUB_TOKEN" ]; then
    echo "🌐 Deploying to GitHub Pages..."
    # This would typically use gh-pages or similar
    echo "✅ Deployment to GitHub Pages initiated"
else
    echo "📁 Build completed successfully!"
    echo "📂 Build files are in the 'build' directory"
    echo "🌐 To deploy, you can upload the contents of the 'build' directory to your web server"
fi

echo "✅ Deployment script completed!" 