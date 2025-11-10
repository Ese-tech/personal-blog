import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

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
  description: "LumaPress: a professional, multilingual blogging platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} antialiased bg-gradient-primary text-neutral-800`} suppressHydrationWarning>
        <ClientProviders>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto w-full px-4 py-8">{children}</main>
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
