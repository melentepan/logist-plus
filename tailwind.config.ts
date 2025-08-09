import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "#ffbd00",
        background: "#FFFFFF",
        foreground: "#000000",
        primary: {
          DEFAULT: "#ffbd00",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#f5f5f5",
          foreground: "#000000",
        },
        destructive: {
          DEFAULT: "#ff4444",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#f5f5f5",
          foreground: "#666666",
        },
        accent: {
          DEFAULT: "#ffbd00",
          foreground: "#000000",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000",
        },
        card: {
          DEFAULT: "#000000",
          foreground: "#FFFFFF",
        },
        // Кастомные цвета для проекта
        gold: "#ffbd00",
        "gold-hover": "#e6a800",
        "gold-focus": "#ffbd00",
        "light-text": "#FFFFFF",
        "dark-text": "#000000",
        "light-bg": "#FFFFFF",
        "card-bg": "#000000",
        "hover-bg": "#1a1a1a",
        success: "#00ff00",
        error: "#ff4444",
        "text-bright": "#FFFFFF",
        "text-medium": "#cccccc",
        "text-muted": "#666666",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        gold: "0 0 0 2px rgba(255, 189, 0, 0.2)",
        "gold-lg": "0 0 0 3px rgba(255, 189, 0, 0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
