module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    backgroundColor: (theme) => ({
      ...theme("colors"),
      darkModeBg: "#121212",
      modalDarkBg: "#2b2b2b",
    }),
  },
  plugins: [],
  darkMode: "class",
};
