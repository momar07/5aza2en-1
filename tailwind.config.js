/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── الألوان الرسمية للشركة ─────────────────────
      colors: {
        // الذهبي الرسمي — استخدم gold-* بدل amber-* لتوحيد الثيم
        gold: {
          50:  "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",  // ← اللون الأساسي
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        // الداكن الرسمي
        dark: {
          50:  "#f8f8f8",
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#9e9e9e",
          400: "#757575",
          500: "#616161",
          600: "#424242",
          700: "#2e2e2e",
          800: "#1a1a1a",
          900: "#0d0d0d",
        },
        // اختصارات مباشرة
        primary:   "#b8962e",
        secondary: "#1a1a2e",
      },

      // ── الخطوط ────────────────────────────────────
      fontFamily: {
        sans:    ["Cairo", "Tajawal", "sans-serif"],
        arabic:  ["Cairo", "Tajawal", "sans-serif"],
        heading: ["Cairo", "sans-serif"],
      },

      // ── الانيميشن ──────────────────────────────────
      animation: {
        "fade-in":    "fadeIn 0.6s ease-in-out",
        "slide-up":   "slideUp 0.7s ease-out",
        "slide-right":"slideRight 0.7s ease-out",
        "glow":       "glow 2s ease-in-out infinite alternate",
        "float":      "float 3s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:     { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp:    { "0%": { transform: "translateY(40px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
        slideRight: { "0%": { transform: "translateX(-40px)", opacity: "0" }, "100%": { transform: "translateX(0)", opacity: "1" } },
        glow:       { "0%": { boxShadow: "0 0 5px #b8962e" }, "100%": { boxShadow: "0 0 30px #b8962e, 0 0 60px #b8962e40" } },
        float:      { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-10px)" } },
        pulseGold:  { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.6" } },
      },

      // ── الظلال ────────────────────────────────────
      boxShadow: {
        "gold":    "0 4px 20px rgba(184,150,46,0.4)",
        "gold-lg": "0 8px 40px rgba(184,150,46,0.6)",
        "dark":    "0 4px 20px rgba(0,0,0,0.5)",
        "card":    "0 2px 15px rgba(0,0,0,0.08)",
        "card-lg": "0 8px 30px rgba(0,0,0,0.12)",
      },

      screens: { xs: "480px" },
    },
  },
  plugins: [],
}
