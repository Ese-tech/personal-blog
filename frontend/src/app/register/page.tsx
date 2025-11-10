"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../../i18n/LanguageContext";

export default function RegisterPage() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post('/auth/register', { 
        username: name, 
        email, 
        password 
      }, {
        withCredentials: true
      });
      
      // Check user role and redirect accordingly
      if (response.data.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || t('registrationFailed'));
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">{t('createAccount')}</h2>
            <p className="text-neutral-600">{t('joinLumaPress')}</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={submit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                {t('username')}
              </label>
              <input 
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors" 
                placeholder={t('yourUsername')} 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                {t('email')}
              </label>
              <input 
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors" 
                placeholder={t('yourEmail')} 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                {t('password')}
              </label>
              <input 
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors" 
                placeholder={t('yourPassword')} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="terms" className="rounded border-neutral-300 text-secondary-600 focus:ring-secondary-500" required />
              <label htmlFor="terms" className="ml-2 text-sm text-neutral-600">
                {t('agreeToTerms')}{' '}
                <Link href="/terms" className="text-secondary-600 hover:text-secondary-800 font-medium">
                  {t('termsOfService')}
                </Link>
                {' '}{t('and')}{' '}
                <Link href="/privacy" className="text-secondary-600 hover:text-secondary-800 font-medium">
                  {t('privacyPolicy')}
                </Link>
              </label>
            </div>

            <button 
              type="submit"
              className="w-full bg-linear-to-r from-secondary-500 to-secondary-600 text-white py-3 px-4 rounded-lg hover:from-secondary-600 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t('creating')}...
                </div>
              ) : (
                t('createAccount')
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              {t('alreadyHaveAccount')}{' '}
              <Link href="/login" className="text-secondary-600 hover:text-secondary-800 font-medium">
                {t('signIn')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
