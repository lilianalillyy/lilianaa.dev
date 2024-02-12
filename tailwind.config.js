const plugin = require('tailwindcss/plugin')

const easeInOutCubic = "cubic-bezier(0.65, 0, 0.35, 1)";


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,jsx,ts,js,html,css}", "./index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        // mono: ["Fira Mono", "sans-serif"]
      },
      transitionTimingFunction: {
        "in-out-cubic": easeInOutCubic
      },
      animation: {
        'spin-cubic': `spin 800ms ${easeInOutCubic} infinite`,
        'title-up': `title-up 900ms cubic-bezier(0.87, 0, 0.13, 1) var(--title-animation-delay) backwards`,      
        'dash': `dash 700ms cubic-bezier(0.87, 0, 0.13, 1) calc(var(--title-animation-delay) + 500ms) forwards`,
      },
      keyframes: {
        "title-up": {
          "0%": {
            opacity: "0",
            transform: 'translateY(100%)',
          },
          "50%": {
            opacity: "75%",
            transform: 'translateY(95%%)',
          },
          "100%": {
            opacity: "100%",
            transform: 'translateY(0)',
          }
        },
        "dash": {
          "0%": {
            width: "0"
          },
          "100%": {
            width: "100%"
          }
        }
      }
    },
  },
  plugins: [],
}

