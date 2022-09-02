/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        libre: ["Libre Franklin", "sans-serif"],
      },
      minHeight: {
        32: "16rem",
        5: "2.5rem",
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
