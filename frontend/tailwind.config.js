/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{ts,tsx,js,jsx}"],
  darkMode: ["class", "media"],
  theme: {
    extend: {
      colors: {
        primary: "#A1C4FD",
        secondary: "#C2E9FB",
        accent: "#FFB6C1",
        border: "#E2E8F0",
        textDark: "#1E293B",
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "sans-serif"],
      },
      borderRadius: {
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
};
