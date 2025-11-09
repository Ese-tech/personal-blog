/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
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
    },
  },
};
