"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../../i18n/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const { t } = useLanguage();
  const { login } = useAuth();
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
      const response = await login(email, password);
      
      // Check user role and redirect accordingly
      if (response.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #F5F6F2 0%, #EAEBD6 50%, #E2E4DC 100%)'}}>
      <div className="max-w-md w-full mx-4">
        <div className="rounded-2xl shadow-xl p-8" style={{backgroundColor: '#E8EAE1'}}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#D4D6D0'}}>
              <svg className="w-8 h-8" style={{color: '#6B7A3F'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-2" style={{color: '#2C2F26'}}>{t('welcomeBack')}</h2>
            <p style={{color: '#5C5F56'}}>{t('signInAccount')}</p>
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
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                {t('email')}
              </label>
              <input 
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors" 
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
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors" 
                placeholder={t('yourPassword')} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-neutral-600">{t('rememberMe')}</span>
              </label>
              <Link 
                href="/forgot-password" 
                className="text-sm text-primary-600 hover:text-primary-800 font-medium"
              >
                {t('forgotPassword')}
              </Link>
            </div>

            <button 
              type="submit"
              className="w-full text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
              style={{backgroundColor: '#6B7A3F'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5A6B32'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6B7A3F'}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t('loading')}
                </div>
              ) : (
                t('login')
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              {t('noAccount')}{' '}
              <Link href="/register" className="text-primary-600 hover:text-primary-800 font-medium">
                {t('signUpNow')}
              </Link>
            </p>
          </div>

          {/* Admin Login Help */}
          <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
            <h3 className="text-sm font-medium text-neutral-900 mb-2">{t('admin')} {t('login')}</h3>
            <p className="text-xs text-neutral-600">
              Use your normal email and password to login as an admin. 
              You will be automatically redirected to the admin area after login.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
