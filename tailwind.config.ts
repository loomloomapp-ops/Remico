import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF6",
        surface: "#FFFFFF",
        ink: "#0F1410",
        muted: "#5A6B62",
        line: "#E6E5DF",
        brand: {
          green: "#1F8F3D",
          "green-deep": "#176E2F",
          "green-soft": "#E8F4EB",
          red: "#E11D17",
          "red-soft": "#FCE9E8",
          purple: "#6B4DE0",
          "purple-soft": "#EFEBFE",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(2.1rem, 4.2vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        h2: ["clamp(2rem, 3.8vw, 3.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        container: "1320px",
      },
      boxShadow: {
        card: "0 1px 0 rgba(15,20,16,0.04), 0 18px 40px -24px rgba(15,20,16,0.18)",
        cta: "0 10px 30px -10px rgba(31,143,61,0.45)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
