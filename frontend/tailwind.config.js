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
        'light-green': '#9CDBB3',
        'dark-green': '#00853D',
      },
      backgroundImage: (theme) => ({
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-linear": "linear-gradient(180deg, var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
      }),
    },
  },
  plugins: [],
};
