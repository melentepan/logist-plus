/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./index.html",
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
        ring: "#D8B323",
        background: "#1A1A1A",
        foreground: "#D4D3D3",
        primary: {
          DEFAULT: "#D8B323",
          foreground: "#1A1A1A",
        },
        secondary: {
          DEFAULT: "#2A2A2A",
          foreground: "#D4D3D3",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FECACA",
        },
        muted: {
          DEFAULT: "#2A2A2A",
          foreground: "#D1D5DB",
        },
        accent: {
          DEFAULT: "#D8B323",
          foreground: "#1A1A1A",
        },
        popover: {
          DEFAULT: "#2A2A2A",
          foreground: "#D4D3D3",
        },
        card: {
          DEFAULT: "#2A2A2A",
          foreground: "#D4D3D3",
        },
        gold: "#D8B323",
        "gold-hover": "#E6C547",
        "gold-focus": "#D8B323",
        "light-gray": "#D4D3D3",
        "dark-bg": "#1A1A1A",
        "card-bg": "#2A2A2A",
        "hover-bg": "#3A3A3A",
        "text-bright": "#E5E7EB",
        "text-medium": "#D1D5DB",
        gray: {
          400: "#A1A1AA",
          500: "#D4D4D8",
          600: "#E4E4E7",
          700: "#F4F4F5",
        },
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
        gold: "0 0 0 2px rgba(216, 179, 35, 0.2)",
        "gold-lg": "0 0 0 3px rgba(216, 179, 35, 0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
