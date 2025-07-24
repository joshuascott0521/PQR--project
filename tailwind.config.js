/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        emeraldBright: "#00bf63",
        "amarillo-gg": "#ffe900",
      },
      screens: {
        xl2: "13400px",
      },
    },
  },
  plugins: [],
};
