/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        primary:"#f98043",
        dark_primary:"#000d47",
        secondary:"#fa384a"
      }
    },
  },
  darkMode: "class",
  darkMode: "class",
 plugins: [nextui()]
}

