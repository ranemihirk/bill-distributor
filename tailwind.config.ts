import type { Config } from "tailwindcss";
import colors from 'tailwindcss/colors';

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        red: colors.red[600],
        green: colors.emerald[900],
        light: colors.neutral[50],
				dark: colors.zinc[900],
        gray: colors.gray[400],
      },
    },
  },
  plugins: [],
  important: true,
} satisfies Config;
