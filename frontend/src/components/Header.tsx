"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="w-full border-b border-border bg-transparent">
      <div className="container mx-auto flex items-center justify-between py-4 px-2">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">LP</div>
          <div>
            <div className="text-lg font-semibold">LumaPress</div>
            <div className="text-xs text-muted">Where your words shine bright.</div>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-textDark dark:text-[#EDEDF2]">Home</Link>
          <Link href="/editor" className="hidden md:inline text-sm font-medium text-textDark dark:text-[#EDEDF2]">Write</Link>
          <Link href="/login" className="text-sm">Login</Link>
          <Link href="/register" className="rounded-full border px-4 py-2 text-sm" >Sign up</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
