#!/bin/bash

# CloudCompass GitHub Pages Deployment Check Script

echo "🧭 CloudCompass GitHub Pages Deployment Check"
echo "=============================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository. Please run this from the CloudCompass directory."
    exit 1
fi

# Get repository information
REPO_URL=$(git remote get-url origin)
echo "📋 Repository URL: $REPO_URL"

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
echo "🌿 Current branch: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Warning: Not on main branch. GitHub Pages typically deploys from main."
fi

# Check if build directory exists
if [ ! -d "build" ]; then
    echo "🏗️  Building project..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Build failed. Please fix build issues first."
        exit 1
    fi
fi

echo "✅ Build directory exists"

# Check build contents
echo "📁 Build contents:"
ls -la build/

# Check for index.html
if [ -f "build/index.html" ]; then
    echo "✅ index.html found in build directory"
else
    echo "❌ index.html not found in build directory"
    exit 1
fi

echo ""
echo "🔧 GitHub Pages Setup Instructions:"
echo "=================================="
echo ""
echo "1. Go to your repository on GitHub:"
echo "   https://github.com/AAkinDev/CloudCompass"
echo ""
echo "2. Go to Settings > Pages"
echo ""
echo "3. Configure GitHub Pages:"
echo "   - Source: 'GitHub Actions'"
echo "   - Branch: main"
echo "   - Folder: / (root)"
echo ""
echo "4. Make sure the repository is public or you have GitHub Pro"
echo ""
echo "5. Push your changes to trigger the deployment:"
echo "   git add ."
echo "   git commit -m 'Fix deployment issues'"
echo "   git push origin main"
echo ""
echo "6. Check the Actions tab for deployment status:"
echo "   https://github.com/AAkinDev/CloudCompass/actions"
echo ""
echo "7. Once deployed, your site will be available at:"
echo "   https://AAkinDev.github.io/CloudCompass"
echo ""
echo "📚 Troubleshooting:"
echo "- If the build fails in Actions, check the logs for specific errors"
echo "- Make sure all dependencies are in package.json"
echo "- Verify that the homepage field in package.json is correct"
echo "- Check that the repository is public or you have GitHub Pro"
echo ""
echo "Happy deploying! 🚀" 