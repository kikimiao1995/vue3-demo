module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "tracker": "url('/src/assets/tracker-bg.jpg')",
      }),
      fontFamily: {
        "baloo-tamma2": ["'Baloo Tamma 2'", "cursive"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // 只會重置使用form-{表單項目}的所有樣式
    }),
  ],
}
