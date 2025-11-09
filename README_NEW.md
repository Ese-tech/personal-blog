# LumaPress - Minimal Feminine Blog Platform

A beautiful, minimal blog platform built with modern web technologies.

## 🌟 Features

- **Beautiful Design**: Feminine, minimal aesthetic with soft colors and elegant typography
- **Modern Stack**: Next.js 16 + React 19, Express.js, MongoDB, TypeScript
- **Authentication**: JWT-based auth with role management (viewer, user, admin)
- **Rich Editor**: Custom Markdown editor with formatting tools
- **Responsive**: Mobile-first design that works on all devices
- **Fast**: Built with Bun runtime for optimal performance
- **SEO Ready**: Auto-generated slugs and optimized URLs

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime installed
- MongoDB Atlas account or local MongoDB
- Node.js 18+ (for Vercel deployment)

### Quick Start

1. Clone and install dependencies:
```bash
git clone <your-repo-url>
cd lumapress
bun install
```

2. Set up environment variables:
```bash
# Backend .env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5001

# Frontend .env.local  
NEXT_PUBLIC_API_URL=http://localhost:5001
```

3. Start development:
```bash
bun run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🏗️ Project Structure

```
lumapress/
├── frontend/              # Next.js frontend
│   ├── src/app/          # Pages (dashboard, editor, posts)
│   └── src/components/   # Reusable components
├── backend/              # Express.js API
│   └── src/             # Models, routes, middleware
└── package.json         # Root workspace config
```

## 🚀 Deployment (Vercel Ready)

This project is configured for easy Vercel deployment:

1. Push to GitHub
2. Connect to Vercel  
3. Set environment variables
4. Deploy automatically!

The root `package.json` manages both frontend and backend as a monorepo.

## 📱 Available Scripts

- `bun run dev` - Start both frontend and backend
- `bun run build` - Build for production
- `bun run start` - Start production server

## 🎨 Design System

- **Primary**: #A1C4FD (soft blue)
- **Secondary**: #C2E9FB (lighter blue)  
- **Accent**: #FFB6C1 (soft pink)
- **Typography**: Poppins + Inter fonts

Built with 💖 by the LumaPress team