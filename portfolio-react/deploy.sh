#!/bin/bash

echo "🚀 Deploying Portfolio to Vercel..."
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
    echo "✅ Vercel CLI installed!"
    echo ""
fi

# Build the project first
echo "📦 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    
    # Deploy to Vercel
    echo "🌐 Deploying to Vercel..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Deployment successful!"
        echo "Your portfolio is now live!"
    else
        echo ""
        echo "❌ Deployment failed. Please check the errors above."
    fi
else
    echo ""
    echo "❌ Build failed. Please fix the errors above before deploying."
fi
