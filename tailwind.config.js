/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#5480ED",
        secondary: "#62B685",
        background: "#FFFEFF",
        textprimary: "#ffffff",
        textDark: "#131826",
        textLight: "#4F5462",
      },
    },
  },
  plugins: [],
};
