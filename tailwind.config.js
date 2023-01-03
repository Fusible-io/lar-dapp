const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      darkBg: "#080B11",
      darkBorder: "#254134",
      lightGreen: "#8FFFAF",
      darkGreenB: "#2E3A35",
      darkGrey: "#303030",
      darkGreyCC: "#303030CC",
      gTextColor: "#C7D8C9",
      lightTextC: "#F2F2F2",
      lightBorder: "#DDDDDD",
      tagColor: "#293249",
      greenBtn: "#005538",
      lightGreenT: "#88E890",
      darkBorderG: "#073A0B",
      lightTextSH: "#CECED0",
      headTextC: "#CFD1D1",
      soonBg: "#F1A33B",
      activeBg: "#16B57F",
      closeBg: "#4F4F4F",
      defaultBg: "#E45555",
      darkBgBlack: "#0F171E",
      white80: "rgba(255, 255, 255, 0.8)",
      borderGreen: "#284637",
      borderRed: "#E45555",
      borderGRGB: "rgba(143, 255, 175, 0.24)",
    },
    boxShadow: {
      list: "0px 12px 120px rgba(143, 255, 175, 0.08)",
    },
    extend: {
      fontFamily: {
        jakarta: ["var(--font-plusJakartaSans)", ...fontFamily.sans],
        inter: ["var(--font-inter)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
