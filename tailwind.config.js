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
    },
  },
  safelist: [
    {
      pattern: /bg-(green)-(.)/,
    },
  ],
  plugins: [require("tailwindcss-radix")({ variantPrefix: "rdx" })],
};
