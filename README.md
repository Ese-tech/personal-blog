# 🌟 LumaPress# LumaPress



A modern, elegant blogging platform built with Next.js and Express. Create, share, and discover beautiful stories with a clean, feminine design aesthetic.LumaPress — a modern, minimal, and feminine blogging platform scaffold.



## ✨ FeaturesThis repository contains a Next.js + TypeScript frontend and a minimal Express + Bun backend skeleton.



- **Modern UI/UX**: Clean, responsive design with dark/light modeQuick start (frontend):

- **Multi-language Support**: English, German, French, Spanish

- **Rich Text Editor**: Beautiful writing experience with image uploads1. Install dependencies:

- **User Management**: Role-based access (Viewer, User, Admin)

- **Image Upload**: Cloudinary integration for optimized images```bash

- **SEO Optimized**: Built-in SEO features and meta tagspnpm install

- **Mobile Responsive**: Works perfectly on all devices```



## 🚀 Quick Start2. Run dev:



### Prerequisites```bash

- Node.js 18+ or Bun 1.0+pnpm dev

- MongoDB database```

- Cloudinary account (for images)

Backend (skeleton) lives in `./backend` and is designed to run under Bun. See `backend/README.md` for details.

### InstallationThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



1. **Clone the repository**## Getting Started

```bash

git clone https://github.com/Ese-tech/personal-blog.gitFirst, run the development server:

cd personal-blog

``````bash

npm run dev

2. **Install dependencies**# or

```bashyarn dev

bun run install:all# or

# orpnpm dev

npm run install:all# or

```bun dev

```

3. **Configure environment variables**

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Create `.env` files in both `frontend/` and `backend/` directories:

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

**Backend (.env)**

```bashThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key## Learn More

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

CLOUDINARY_API_KEY=your_cloudinary_api_keyTo learn more about Next.js, take a look at the following resources:

CLOUDINARY_API_SECRET=your_cloudinary_api_secret

```- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

**Frontend (.env.local)**

```bashYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

NEXT_PUBLIC_API_URL=http://localhost:5000/api

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name## Deploy on Vercel

```

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

4. **Start development servers**

```bashCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

bun run dev
```

This starts both frontend (port 3000) and backend (port 5000).

## 📦 Scripts

- `bun run dev` - Start development servers
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run install:all` - Install all dependencies

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client

### Backend
- **Express.js** - Web framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Bcrypt** - Password hashing

## 📱 Usage

1. **Register an account** at `/register`
2. **Login** at `/login`
3. **Create posts** in the editor at `/editor`
4. **Manage content** in your dashboard at `/dashboard`
5. **Admin features** available at `/admin` (for admin users)

## 🌍 Deployment

### Vercel (Recommended)

1. **Frontend**: Deploy the `frontend/` directory to Vercel
2. **Backend**: Deploy to Vercel as a serverless function or use Railway/Render
3. **Environment Variables**: Configure all required env vars in your hosting platform

### Manual Deployment

```bash
# Build the project
bun run build

# Start production server
bun run start
```

## 🎨 Customization

- **Colors**: Edit `frontend/tailwind.config.js`
- **Branding**: Update logos and brand text in components
- **Languages**: Add translations in `frontend/src/i18n/translations.ts`

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For support and questions, please open an issue on GitHub.

---

**Built with ❤️ by the LumaPress Team**