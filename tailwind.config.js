/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          md: "6rem",
        },
      },
      colors: {
        second: "rgb(214 211 209)",
        navy: "#0E1E45",
      },
      fontFamily: {
        noto: ["Noto Sans", "sans-serif"],
        dm: ["DM Sans", "cursive"],
      },
    },
  },
  plugins: [],
};
