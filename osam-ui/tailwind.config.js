/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "forest-600": "#1B5E20",
        "forest-700": "#1B4D1F",
        "monsoon-600": "#2D3E50",
        "mint-600": "#10B981",
        "gold-600": "#D4A574",
      },
    },
  },
  plugins: [],
}
