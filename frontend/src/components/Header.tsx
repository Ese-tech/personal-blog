"use client";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../i18n/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { t } = useLanguage();
  const { user, loading, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="w-full border-b backdrop-blur-sm sticky top-0 z-50" style={{borderColor: '#D4D6D0', backgroundColor: 'rgba(245, 246, 242, 0.9)'}}>
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl flex items-center justify-center text-white font-semibold" style={{background: 'linear-gradient(135deg, #6B7A3F 0%, #8A9A5B 100%)'}}>LP</div>
          <div>
            <div className="text-lg font-semibold" style={{color: '#2C2F26'}}>LumaPress</div>
            <div className="text-xs" style={{color: '#5C5F56'}}>{t('description')}</div>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          {/* Public Navigation */}
          <Link href="/" className="text-sm font-medium transition-colors" style={{color: '#5C5F56'}} onMouseEnter={(e) => e.currentTarget.style.color = '#6B7A3F'} onMouseLeave={(e) => e.currentTarget.style.color = '#5C5F56'}>
            {t('home')}
          </Link>
          
          {/* User Navigation */}
          {user && (user.role === 'user' || user.role === 'admin') && (
            <>
              <Link href="/dashboard" className="hidden md:inline text-sm font-medium transition-colors" style={{color: '#5C5F56'}} onMouseEnter={(e) => e.currentTarget.style.color = '#6B7A3F'} onMouseLeave={(e) => e.currentTarget.style.color = '#5C5F56'}>
                {t('dashboard')}
              </Link>
              <Link href="/editor" className="hidden md:inline text-sm font-medium transition-colors" style={{color: '#5C5F56'}} onMouseEnter={(e) => e.currentTarget.style.color = '#6B7A3F'} onMouseLeave={(e) => e.currentTarget.style.color = '#5C5F56'}>
                {t('write')}
              </Link>
            </>
          )}

          {/* Admin Navigation */}
          {user && user.role === 'admin' && (
            <Link href="/admin" className="hidden md:inline text-sm font-medium transition-colors" style={{color: '#8A9A5B'}} onMouseEnter={(e) => e.currentTarget.style.color = '#6B7A3F'} onMouseLeave={(e) => e.currentTarget.style.color = '#8A9A5B'}>
              {t('admin')}
            </Link>
          )}

          {/* Language Selector */}
          <LanguageSelector />

          {/* Auth Section */}
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse"></div>
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-opacity text-white"
                style={{background: 'linear-gradient(135deg, #8A9A5B 0%, #A8B48C 100%)'}}
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-medium">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline text-sm font-medium">
                  {user.username}
                </span>
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border py-1 z-50" style={{backgroundColor: '#E8EAE1', borderColor: '#D4D6D0'}}>
                  <div className="px-4 py-2 text-xs border-b" style={{color: '#7A7D73', borderColor: '#D4D6D0'}}>
                    {t('login')} {user.role}
                  </div>
                  <Link
                    href={`/profile/${user.username}`}
                    className="block px-4 py-2 text-sm transition-colors"
                    style={{color: '#2C2F26'}}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D4D6D0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={() => setDropdownOpen(false)}
                  >
                    {t('profile')}
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm transition-colors"
                    style={{color: '#2C2F26'}}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D4D6D0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={() => setDropdownOpen(false)}
                  >
                    {t('dashboard')}
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm transition-colors"
                      style={{color: '#2C2F26'}}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D4D6D0'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      onClick={() => setDropdownOpen(false)}
                    >
                      👑 {t('adminArea')}
                    </Link>
                  )}
                  <hr className="my-1" style={{borderColor: '#D4D6D0'}} />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm transition-colors"
                    style={{color: '#A0522D'}}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D4D6D0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    🚪 {t('logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                href="/login" 
                className="text-sm font-medium transition-colors"
                style={{color: '#5C5F56'}}
                onMouseEnter={(e) => e.currentTarget.style.color = '#6B7A3F'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#5C5F56'}
              >
                {t('login')}
              </Link>
              <Link 
                href="/register" 
                className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity shadow-md hover:shadow-lg"
                style={{background: 'linear-gradient(135deg, #6B7A3F 0%, #8A9A5B 100%)'}}
              >
                {t('register')}
              </Link>
            </div>
          )}

          <ThemeToggle />
        </nav>
      </div>

      {/* Mobile Dropdown Backdrop */}
      {dropdownOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </header>
  );
}
