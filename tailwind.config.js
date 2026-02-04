/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#060a12",
        navy: "#0c1a33",
        teal: "#5ce0ff",
        electric: "#72a8ff",
        mist: "#dfe9ff"
      },
      boxShadow: {
        glow: "0 0 45px rgba(92, 224, 255, 0.28)",
        soft: "0 24px 70px rgba(4, 8, 18, 0.35)"
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(circle at top left, rgba(92, 224, 255, 0.18), transparent 55%), radial-gradient(circle at 20% 40%, rgba(114, 168, 255, 0.25), transparent 60%)"
      }
    }
  },
  plugins: []
};

