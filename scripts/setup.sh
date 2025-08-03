#!/bin/bash

# CloudCompass Setup Script
# Automates the setup process for the CloudCompass project

echo "🧭 CloudCompass Setup Script"
echo "=============================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2)
REQUIRED_VERSION="16.0.0"

# Simple version comparison (major.minor.patch format)
NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1)
REQUIRED_MAJOR=$(echo $REQUIRED_VERSION | cut -d'.' -f1)

if [ "$NODE_MAJOR" -lt "$REQUIRED_MAJOR" ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to Node.js 16+ and try again."
    exit 1
fi

echo "✅ Node.js version $NODE_VERSION detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Run tests
echo "🧪 Running tests..."
npm test -- --watchAll=false

if [ $? -ne 0 ]; then
    echo "⚠️  Some tests failed, but continuing with setup"
fi

# Build the project
echo "🏗️  Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Create necessary directories
echo "📁 Creating project structure..."
mkdir -p public/assets/logos
mkdir -p src/components
mkdir -p src/utils
mkdir -p src/data
mkdir -p docs

echo "✅ Project structure created"

# Set up git hooks (if .git exists)
if [ -d ".git" ]; then
    echo "🔧 Setting up git hooks..."
    
    # Pre-commit hook
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
# CloudCompass pre-commit hook

echo "🔍 Running pre-commit checks..."

# Run tests
npm test -- --watchAll=false --silent
if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Commit aborted."
    exit 1
fi

# Check for console.log statements
if git diff --cached --name-only | grep -E '\.(js|jsx|ts|tsx)$' | xargs grep -l 'console\.log' 2>/dev/null; then
    echo "⚠️  Warning: console.log statements found in staged files"
    echo "Please remove them before committing (or use --no-verify to skip)"
    exit 1
fi

echo "✅ Pre-commit checks passed"
EOF

    chmod +x .git/hooks/pre-commit
    echo "✅ Git hooks configured"
fi

# Create environment file template
echo "🔧 Creating environment template..."
cat > .env.example << 'EOF'
# CloudCompass Environment Variables
# Copy this file to .env.local for local development

# GitHub API Token (optional, for fetching latest pricing data)
# REACT_APP_GITHUB_TOKEN=your_token_here

# Analytics (optional)
# REACT_APP_GA_TRACKING_ID=your_ga_id_here

# Feature flags
REACT_APP_ENABLE_COST_CALCULATOR=true
REACT_APP_ENABLE_DECISION_WIZARD=true
REACT_APP_ENABLE_ANALYTICS_VIEW=true
EOF

echo "✅ Environment template created"

# Success message
echo ""
echo "🎉 CloudCompass setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Copy .env.example to .env.local and configure as needed"
echo "   2. Add your cloud provider logos to public/assets/logos/"
echo "   3. Start the development server: npm start"
echo "   4. Visit http://localhost:3000 to see your app"
echo ""
echo "🚀 To deploy to GitHub Pages:"
echo "   1. Enable GitHub Pages in your repository settings"
echo "   2. Push to main branch (auto-deployment configured)"
echo ""
echo "📚 For more information, see:"
echo "   - README.md for usage instructions"
echo "   - CONTRIBUTING.md for development guidelines"
echo "   - GitHub repository for issues and discussions"
echo ""
echo "Happy cloud navigating! 🧭✨" 