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
        primary: {
          DEFAULT: "#0066CC",
          50: "#E6F0FA",
          100: "#CCE0F5",
          200: "#99C2EB",
          300: "#66A3E0",
          400: "#3385D6",
          500: "#0066CC",
          600: "#0052A3",
          700: "#003D7A",
          800: "#002952",
          900: "#001429",
        },
        secondary: {
          DEFAULT: "#00B894",
          50: "#E6FAF6",
          100: "#CCF5ED",
          200: "#99EBD9",
          300: "#66E0C6",
          400: "#33D6B2",
          500: "#00B894",
          600: "#009376",
          700: "#006E58",
          800: "#004A3B",
          900: "#00251D",
        },
        accent: {
          DEFAULT: "#FF6B6B",
          50: "#FFF0F0",
          100: "#FFE0E0",
          500: "#FF6B6B",
          600: "#CC5656",
        },
        background: "#F8FAFC",
        muted: "#718096",
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans JP", "sans-serif"],
        jp: ["Noto Sans JP", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
