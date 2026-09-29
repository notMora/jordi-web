// Extracted from the former inline Tailwind Play CDN config of the legal pages.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/privacy.html",
    "./public/terms.html",
    "./public/cookies.html",
    "./public/assets/js/legal.js",
    "./public/assets/js/consent.js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#131313",
        "on-surface": "#e5e2e1",
        "primary-container": "#c6ff3d",
        "on-primary-fixed": "#141f00"
      },
      fontFamily: {
        sans: [
          "Inter",
          "sans-serif"
        ]
      }
    }
  }
};
