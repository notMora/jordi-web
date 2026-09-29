// Extracted from the former inline Tailwind Play CDN config of index.html.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.html",
    "./src/partials/**/*.html",
    "./scripts/build-pages.mjs",
    "./public/assets/js/main.js",
    "./public/assets/js/booking.js",
    "./public/assets/js/consent.js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#131313",
        "on-primary-container": "#516e00",
        "on-secondary-fixed": "#1a1c1c",
        "on-secondary": "#2f3131",
        "on-error": "#690005",
        "on-tertiary": "#372c3f",
        "on-primary": "#263500",
        "on-surface": "#e5e2e1",
        "on-tertiary-container": "#6c6075",
        "on-secondary-fixed-variant": "#454747",
        "tertiary-container": "#edddf6",
        "on-tertiary-fixed": "#211829",
        "inverse-on-surface": "#313030",
        "inverse-primary": "#4c6700",
        "tertiary-fixed-dim": "#d1c1d9",
        "primary-container": "#bdf532",
        secondary: "#c6c6c7",
        "on-surface-variant": "#c3c9ae",
        "tertiary-fixed": "#edddf6",
        "surface-container-highest": "#353534",
        error: "#ffb4ab",
        "on-background": "#e5e2e1",
        "inverse-surface": "#e5e2e1",
        tertiary: "#ffffff",
        primary: "#ffffff",
        outline: "#8d937b",
        "error-container": "#93000a",
        "surface-variant": "#353534",
        "surface-dim": "#131313",
        "on-primary-fixed-variant": "#384e00",
        "on-primary-fixed": "#141f00",
        "primary-fixed": "#bdf532",
        surface: "#131313",
        "on-secondary-container": "#b4b5b5",
        "surface-container-high": "#2a2a2a",
        "primary-fixed-dim": "#a2d801",
        "secondary-fixed": "#e2e2e2",
        "on-error-container": "#ffdad6",
        "surface-container-lowest": "#0e0e0e",
        "surface-container-low": "#1c1b1b",
        "on-tertiary-fixed-variant": "#4e4256",
        "secondary-container": "#454747",
        "surface-container": "#201f1f",
        "surface-tint": "#a2d801",
        "secondary-fixed-dim": "#c6c6c7",
        "surface-bright": "#3a3939",
        "outline-variant": "#434934"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        "space-lg": "1.5rem",
        gutter: "1.5rem",
        margin: "3rem",
        "space-3xl": "8rem",
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-xl": "3rem",
        "space-md": "1rem",
        "gutter-sm": "1rem",
        "space-2xl": "5rem",
        "margin-mobile": "1.25rem"
      },
      fontFamily: {
        "headline-lg": [
          "Inter"
        ],
        "display-xl": [
          "Inter"
        ],
        "headline-md": [
          "Inter"
        ],
        "label-ui": [
          "Inter"
        ],
        "body-md": [
          "Inter"
        ],
        "headline-sm": [
          "Inter"
        ],
        "headline-lg-mobile": [
          "Inter"
        ],
        "display-xl-mobile": [
          "Inter"
        ],
        "body-lg": [
          "Inter"
        ],
        "label-code": [
          "Inter"
        ]
      },
      fontSize: {
        "headline-lg": [
          "48px",
          {
            lineHeight: "52px",
            letterSpacing: "-0.03em",
            fontWeight: "600"
          }
        ],
        "display-xl": [
          "84px",
          {
            lineHeight: "88px",
            letterSpacing: "-0.04em",
            fontWeight: "600"
          }
        ],
        "headline-md": [
          "32px",
          {
            lineHeight: "38px",
            letterSpacing: "-0.02em",
            fontWeight: "600"
          }
        ],
        "label-ui": [
          "13px",
          {
            lineHeight: "16px",
            letterSpacing: "0.02em",
            fontWeight: "600"
          }
        ],
        "body-md": [
          "15px",
          {
            lineHeight: "24px",
            letterSpacing: "0em",
            fontWeight: "400"
          }
        ],
        "headline-sm": [
          "22px",
          {
            lineHeight: "28px",
            letterSpacing: "-0.015em",
            fontWeight: "500"
          }
        ],
        "headline-lg-mobile": [
          "32px",
          {
            lineHeight: "36px",
            letterSpacing: "-0.025em",
            fontWeight: "600"
          }
        ],
        "display-xl-mobile": [
          "44px",
          {
            lineHeight: "48px",
            letterSpacing: "-0.03em",
            fontWeight: "600"
          }
        ],
        "body-lg": [
          "18px",
          {
            lineHeight: "28px",
            letterSpacing: "-0.01em",
            fontWeight: "400"
          }
        ],
        "label-code": [
          "11px",
          {
            lineHeight: "14px",
            letterSpacing: "0.08em",
            fontWeight: "500"
          }
        ]
      }
    }
  }
};
