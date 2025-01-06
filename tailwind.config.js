/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ring: "var(--ring)",
        border: "var(--border)",
        main: "var(--main)",
        sub: "var(--sub)",
        background: "var(--background)",
        error: "var(--error)",
      },
    },
  },
  plugins: [],
};
