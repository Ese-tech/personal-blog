#!/bin/bash

echo "🚀 Preparing for Vercel Deployment..."

# Install Vercel CLI if not present
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Set environment variables in Vercel
echo "🔑 Setting up environment variables..."

echo "Please run these commands to set up your environment variables:"
echo ""
echo "vercel env add MONGODB_URI"
echo "vercel env add JWT_SECRET"
echo "vercel env add CLOUDINARY_CLOUD_NAME"
echo "vercel env add CLOUDINARY_API_KEY"
echo "vercel env add CLOUDINARY_API_SECRET"
echo ""
echo "Environment values:"
echo "MONGODB_URI: mongodb+srv://esemongo:Te0Pb56NYgQBYkMG@cluster0.tiarth9.mongodb.net/LumaPressblog"
echo "JWT_SECRET: replace-with-a-secure-secret"
echo "CLOUDINARY_CLOUD_NAME: dm7qehsww"
echo "CLOUDINARY_API_KEY: 662383371352791"
echo "CLOUDINARY_API_SECRET: kfkT5qhiLepht2S6MsUpgAcNGPQ"
echo ""
echo "Then run: vercel --prod"