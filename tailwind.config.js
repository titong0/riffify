/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        purplish: "#332B47",
      },
      fontFamily: {
        libre: ["Libre Franklin", "sans-serif"],
      },
      minHeight: {
        32: "16rem",
        5: "2.5rem",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: "1" },
        },
        "fade-in-bg": {
          "0%": { "background-color": "transparent" },
          "100%": { "background-color": "" },
        },
      },
    },
  },
  safelist: [
    {
      pattern: /bg-(green)-(.)/,
    },
  ],
  plugins: [require("tailwindcss-radix")({ variantPrefix: "rdx" })],
};
