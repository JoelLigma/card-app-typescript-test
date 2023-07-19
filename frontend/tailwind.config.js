module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    backgroundColor: (theme) => ({
      ...theme("colors"),
      darkModeBg: "#121212",
      modalDarkBg: "#2b2b2b",
    }),
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
  darkMode: "class",
};
