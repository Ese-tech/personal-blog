#!/bin/bash

# 🚀 Vercel Deployment Guide for LumaPress

echo "🌟 LumaPress - Vercel Deployment Setup"
echo "========================================"

echo ""
echo "📋 Pre-Deployment Checklist:"
echo "✅ MongoDB database ready"
echo "✅ Cloudinary account configured"
echo "✅ Environment variables prepared"
echo ""

echo "🔧 Required Environment Variables for Vercel:"
echo ""
echo "Backend Environment Variables:"
echo "MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/lumapress"
echo "JWT_SECRET=your-secure-jwt-secret-key"
echo "CLOUDINARY_CLOUD_NAME=your-cloud-name"
echo "CLOUDINARY_API_KEY=your-api-key"
echo "CLOUDINARY_API_SECRET=your-api-secret"
echo ""

echo "Frontend Environment Variables:"
echo "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name"
echo ""

echo "🚀 Deployment Steps:"
echo "1. Install Vercel CLI: npm i -g vercel"
echo "2. Login to Vercel: vercel login"
echo "3. Deploy: vercel"
echo "4. Set environment variables in Vercel dashboard"
echo "5. Redeploy: vercel --prod"
echo ""

echo "🔗 Post-Deployment:"
echo "1. Update NEXT_PUBLIC_API_URL to your Vercel domain"
echo "2. Test all features (login, image upload, admin)"
echo "3. Monitor logs for any issues"
echo ""

echo "🎉 LumaPress is ready for production!"