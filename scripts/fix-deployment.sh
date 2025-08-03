#!/bin/bash

# CloudCompass GitHub Pages Deployment Fix Script

echo "🔧 CloudCompass GitHub Pages Deployment Fix"
echo "==========================================="

echo ""
echo "📋 Current Status:"
echo "The site is showing README content instead of the React app."
echo "This means GitHub Pages is not using the Actions deployment."
echo ""

echo "🔧 Manual Fix Required:"
echo "======================="
echo ""
echo "1. Go to your repository settings:"
echo "   https://github.com/AAkinDev/CloudCompass/settings/pages"
echo ""
echo "2. In the 'Source' section, change from:"
echo "   - 'Deploy from a branch' (if selected)"
echo "   TO:"
echo "   - 'GitHub Actions'"
echo ""
echo "3. Save the changes"
echo ""
echo "4. Check the Actions tab to see if deployment is running:"
echo "   https://github.com/AAkinDev/CloudCompass/actions"
echo ""
echo "5. Wait for the deployment to complete (usually 2-5 minutes)"
echo ""
echo "6. Once deployed, the site will show the React app with the logo at:"
echo "   https://AAkinDev.github.io/CloudCompass"
echo ""

echo "📚 Alternative: Force a new deployment"
echo "======================================"
echo "If the above doesn't work, we can force a new deployment:"
echo ""

read -p "Do you want to force a new deployment? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔄 Forcing new deployment..."
    
    # Create a small change to trigger deployment
    echo "# Deployment trigger" >> README.md
    git add README.md
    git commit -m "Trigger deployment with logo integration"
    git push origin main
    
    echo "✅ Deployment triggered!"
    echo "Check: https://github.com/AAkinDev/CloudCompass/actions"
else
    echo "ℹ️  Please manually configure GitHub Pages as described above."
fi

echo ""
echo "🎯 Expected Result:"
echo "After fixing the GitHub Pages settings, you should see:"
echo "- The CloudCompass logo in the header"
echo "- Navigation buttons (Compare, Decide, Analytics, Calculate)"
echo "- Main heading: 'Navigate Your Cloud Journey with Confidence'"
echo "- Action buttons: 'Start Comparing Services' and 'Get Recommendations'"
echo ""
echo "If you still see the README content, the deployment hasn't completed yet."
echo "Check the Actions tab for deployment status." 