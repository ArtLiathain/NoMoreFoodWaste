/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#12372A",
        light: "#FBFADA",
        content: "#436850",
        highlight: "#ADBC9F",
      },
      backgroundImage: {
        "tableOfFood": "url('./src/Images/foodtable.webp')",
      },
    },
  },
  plugins: [],
};
