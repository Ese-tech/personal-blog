'use client';

import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/translations';

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
];

export default function LanguageSelector() {
  const { language, setLanguage, isLoaded } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Don't render until context is loaded to prevent hydration mismatch
  if (!isLoaded) {
    return (
      <div className="relative">
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-500 transition-colors">
          <span className="text-lg filter contrast-125 brightness-110">🇺🇸</span>
          <span className="hidden sm:inline text-sm font-medium text-neutral-700 dark:text-neutral-300">
            English
          </span>
          <svg className="w-4 h-4 text-neutral-500 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    );
  }

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors"
        style={{backgroundColor: '#E8EAE1', borderColor: '#D4D6D0'}}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#6B7A3F'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#D4D6D0'}
      >
        <span className="text-lg filter contrast-125 brightness-110">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-sm font-medium" style={{color: '#2C2F26'}}>
          {currentLanguage.name}
        </span>
        <svg className="w-4 h-4" style={{color: '#7A7D73'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border py-1 z-50" style={{backgroundColor: '#E8EAE1', borderColor: '#D4D6D0'}}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                  lang.code === language ? '' : ''
                }`}
                style={{
                  backgroundColor: lang.code === language ? '#D4D6D0' : 'transparent',
                  color: lang.code === language ? '#6B7A3F' : '#2C2F26'
                }}
                onMouseEnter={(e) => {
                  if (lang.code !== language) {
                    e.currentTarget.style.backgroundColor = '#D4D6D0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (lang.code !== language) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span className="text-lg filter contrast-125 brightness-110">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {lang.code === language && (
                  <svg className="w-4 h-4 ml-auto" style={{color: '#6B7A3F'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}