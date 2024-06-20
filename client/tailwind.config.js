/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      fontFamily:{
        sans:["Montserrat", "sans-serif"]
      },
      colors:{
        'text-primary': '#404040',
        'text-secundary': '#d1d5db',
        'primary': '#fbbf24',
        
      }
    },
  },
  plugins: [],
}

