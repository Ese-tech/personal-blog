"use client";
import Link from "next/link";
import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-700 mt-12 bg-white dark:bg-neutral-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-xl flex items-center justify-center text-white font-semibold text-sm" style={{background: 'linear-gradient(135deg, #6B7A3F 0%, #8A9A5B 100%)'}}>
                LP
              </div>
              <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">LumaPress</div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4 max-w-md">
              {t('aboutPlatform')}
            </p>
            <div className="text-sm text-neutral-500 dark:text-neutral-500">
              © {new Date().getFullYear()} ESE-Tech Solutions GmbH. {t('allRightsReserved')}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">{t('platform')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {t('register')}
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {t('login')}
                </Link>
              </li>
              <li>
                <Link href="/editor" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {t('writeArticle')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">{t('legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/impressum" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {t('legalNotice')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {t('termsOfService')}
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:legal@ese-tech.de" 
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {t('legalRequests')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-200 dark:border-neutral-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-neutral-500 dark:text-neutral-500">
              {t('operatedBy')}
            </div>
            <div className="flex items-center gap-6">
              <a 
                href="mailto:support@ese-tech.de" 
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {t('support')}
              </a>
              <a 
                href="mailto:info@ese-tech.de" 
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {t('contact')}
              </a>
              <div className="text-sm text-neutral-500 dark:text-neutral-500">
                v1.0.0
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
