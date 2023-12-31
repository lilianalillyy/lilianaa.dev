const easeInOutCubic = "cubic-bezier(0.65, 0, 0.35, 1)";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,jsx,ts,js,html,css}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik", "sans-serif"],
        mono: ["Fira Mono", "sans-serif"]
      },
      transitionTimingFunction: {
        "in-out-cubic": easeInOutCubic
      },
      animation: {
        'spin-cubic': `spin 800ms ${easeInOutCubic} infinite`,
      }
    },
  },
  plugins: [],
}

