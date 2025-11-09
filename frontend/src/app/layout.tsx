import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LumaPress — Where your words shine bright.",
  description: "LumaPress: a minimal, feminine, and modern blogging platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} antialiased bg-neutral-50 text-textDark dark:bg-[#1E1E2E] dark:text-[#EDEDF2]`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 container mx-auto w-full px-4 py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
