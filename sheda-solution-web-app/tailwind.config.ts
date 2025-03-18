import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'red': '#C1272D',
        'lightRed': '#C1272D0A',
        'gray': '#878787',
        // background: "var(--background)",
        // foreground: "var(--foreground)",
      },

    },
  },
  plugins: [],
} satisfies Config;
