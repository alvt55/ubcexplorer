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
        hoverblue: "var(--hoverblue)",
        blue: "var(--blue)",
        red: "var(--red)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    container: {
      center: true,
    }
  },
  plugins: [],
} satisfies Config;
