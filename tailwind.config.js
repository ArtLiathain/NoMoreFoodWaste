/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#12372A",
        light: "#FBFADA",
        content: "#ADBC9F",
        highlight: "#436850",
      },
      backgroundImage: {
        'hero-pattern': "url('./src/Images/food.png')",
      }
    },
  },
  plugins: [],
};
