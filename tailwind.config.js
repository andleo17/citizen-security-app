const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.tsx",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        "pulse-emergency":
          "pulse-emergency 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-emergency-dark":
          "pulse-emergency-dark 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "pulse-emergency": {
          "0%, 100%": {
            "background-color": "rgb(248 180 180 / var(--tw-bg-opacity))",
          },
          "50%": {
            "background-color": "rgb(249 128 128 / var(--tw-bg-opacity))",
          },
        },
        "pulse-emergency-dark": {
          "0%, 100%": {
            "background-color": "rgb(119 29 29 / var(--tw-bg-opacity))",
          },
          "50%": {
            "background-color": "rgb(155 28 28 / var(--tw-bg-opacity))",
          },
        },
      },
    },
  },

  plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
