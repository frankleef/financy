import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-public-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        surface: {
          DEFAULT: "#faf9f6",
          card: "#ffffff",
        },
        ink: {
          DEFAULT: "#1b1a17",
          secondary: "#57544d",
          muted: "#6c6a64",
          faint: "#98958d",
        },
        line: {
          DEFAULT: "#e3e0d9",
          soft: "#eeece6",
          faint: "#f2f0ea",
          input: "#d9d5cc",
        },
        teal: {
          DEFAULT: "#0f6e56",
          light: "#e6f0ec",
          border: "#cfe0da",
          50: "#b4d6cc",
          100: "#79b6a6",
          200: "#3f9280",
          300: "#0f6e56",
        },
        gold: "#d8b45a",
        destructive: {
          DEFAULT: "#b4362f",
          border: "#e6cbc8",
        },
        field: {
          DEFAULT: "#f4f2ec",
          alt: "#f7f5ef",
        },
      },
      borderRadius: {
        card: "18px",
        control: "11px",
        chip: "7px",
      },
    },
  },
  plugins: [],
} satisfies Config;
