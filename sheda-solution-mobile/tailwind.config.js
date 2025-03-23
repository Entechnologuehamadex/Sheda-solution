/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#C1272D",
        background: "#FFFFFF",
        primaryText: "#000000",
        secondaryText: "#878787",
        cardBackground: "#F5F5F5",
        borderColor: "#D8DADC",
        active: "#FFE6E6",
      },
      spacing: {
        sm: 8,
        md: 16,
        lg: 24,
      },
    },
  },
  plugins: [],
};
