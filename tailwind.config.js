/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007BFF', // Blue
        },
        secondary: {
          DEFAULT: '#28A745', // Green
          caution: '#FFC107', // Orange
        },
        alert: {
          DEFAULT: '#FF4D4D', // Red
        },
        background: {
          light: '#F7F7F7', // Light Gray
          white: '#FFFFFF',  // White
        },
        text: {
          dark: '#343A40', // Dark Gray
          medium: '#6C757D', // Medium Gray
          white: '#FFFFFF', // White for dark backgrounds
        },
        accent: {
          yellow: '#FFD700', // Yellow
          teal: '#20C997',    // Teal
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Use Inter as the default sans-serif font
      },
    },
  },
  plugins: [],
}