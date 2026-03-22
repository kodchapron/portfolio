/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // คุณสามารถเพิ่ม Font หรือสีประจำตัว (Brand Color) ได้ที่นี่
      colors: {
        primary: '#4f46e5', // สี Indigo-600 ที่เราใช้ใน Portfolio
      }
    },
  },
  plugins: [],
}