// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This scans all your component files
  ],
  // For Tailwind v4, your theme and plugins are in src/index.css
  // This file is now correct.
}