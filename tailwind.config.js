module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // ต้องมี .tsx ด้วย
  ],
  theme: {
    extend: {
      fontFamily: {
        gluten: ['"Gluten"', "cursive"],
        roboto: ['"Roboto"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
