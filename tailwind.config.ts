import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FDFBF7",
          100: "#F9F4E8",
          200: "#F2E5C8",
          300: "#E6D19E",
          400: "#D4AF37",
          500: "#C59B27",
          600: "#A87E1B",
          700: "#856015",
          800: "#634714",
          900: "#443010",
        },
        obsidian: {
          800: "#131722",
          850: "#0F131D",
          900: "#0A0D14",
          950: "#05070A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        "gold-glow": "0 0 25px -5px rgba(212, 175, 55, 0.3)",
        "gold-glow-lg": "0 0 45px -5px rgba(212, 175, 55, 0.4)",
        "subtle-card": "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA771C 100%)",
        "gold-gradient-soft": "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%)",
        "dark-radial": "radial-gradient(circle at 50% 0%, #151C2C 0%, #05070A 75%)",
      },
    },
  },
  plugins: [],
};

export default config;
