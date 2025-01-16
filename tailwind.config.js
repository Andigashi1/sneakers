/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(26, 100%, 55%)',
        lightorng: 'hsl(25, 100%, 94%)',
        darkblue: 'hsl(220, 13%, 13%)',
        gray1: 'hsl(219, 9%, 45%)',
        gray2: 'hsl(220, 14%, 75%)',
        gray3: 'hsl(223, 64%, 98%)',

      },

      fontFamily: {
        'primary': ['Kumbh sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

