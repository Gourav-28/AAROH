import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF6EC",
        paper: "#F3EDDE",
        ink: "#262319",
        emerald: {
          DEFAULT: "#2F6B4E",
          light: "#DCEAE0",
          dark: "#1F4B36",
        },
        amber: {
          DEFAULT: "#D98936",
          light: "#F7E4C8",
          dark: "#A5641F",
        },
        slateblue: {
          DEFAULT: "#4A6C8C",
          light: "#DCE5EC",
          dark: "#324B63",
        },
      },
      fontFamily: {
        display: ["var(--font-baloo)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        olchiki: ["var(--font-olchiki)", "sans-serif"],
      },
      borderRadius: {
        blob: "2rem",
      },
    },
  },
  plugins: [],
};
export default config;
