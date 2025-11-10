'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', {
        email
      });
      
      setMessage('Wenn ein Konto mit dieser E-Mail-Adresse existiert, wurde eine E-Mail mit Anweisungen zum Zurücksetzen des Passworts gesendet.');
      setEmail('');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
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
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Passwort vergessen?</h1>
            <p className="text-neutral-600">
              Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <div className="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded mb-6">
              {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                E-Mail-Adresse
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="ihre.email@beispiel.de"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sende...
                </div>
              ) : (
                'Reset-Link senden'
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <Link 
              href="/login" 
              className="text-primary-600 hover:text-primary-800 text-sm font-medium"
            >
              ← Zurück zur Anmeldung
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
            <h3 className="text-sm font-medium text-neutral-900 mb-2">Hilfe benötigt?</h3>
            <p className="text-xs text-neutral-600 mb-2">
              Falls Sie weiterhin Probleme haben, kontaktieren Sie unseren Support:
            </p>
            <a 
              href="mailto:support@ese-tech.de" 
              className="text-xs text-primary-600 hover:text-primary-800"
            >
              support@ese-tech.de
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}