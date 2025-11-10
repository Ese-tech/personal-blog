/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366F1',
          600: '#5b21b6',
          700: '#4338ca',
          900: '#312e81',
        },
        secondary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          500: '#EC4899',
          600: '#db2777',
          700: '#be185d',
          900: '#831843',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#F59E0B',
          600: '#d97706',
          700: '#b45309',
          900: '#78350f',
        },
        tertiary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          900: '#064e3b',
        },
        success: {
          50: '#ecfdf5',
          500: '#10B981',
          600: '#059669',
        },
        warning: {
          50: '#fffbeb',
          500: '#F59E0B',
          600: '#d97706',
        },
        error: {
          50: '#fef2f2',
          500: '#EF4444',
          600: '#dc2626',
        },
        info: {
          50: '#eff6ff',
          500: '#3B82F6',
          600: '#2563eb',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)',
        'gradient-accent': 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "sans-serif"],
      },
    },
  },
};
