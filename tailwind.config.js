/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary-light":"#7584bf",
        "primary":"#4a5daa",
        "primary-dark":"#253571",
        "background": "#f5f5f5",
        "secondary": "#33a6a8",
        "secondary-dark": "#1e6465",
        "secondary-light": "#3bc1c3",
        "secondary-extra-dark": "#1a5658"
        
      },
fontFamily:{
  'Poppins': ["Poppins", 'sans-serif'],
  'Jost': ["Jost", 'sans-serif'],

},
backgroundImage: {
  'custom-image': "url('src/assets/images/bg-1.png')",
},
    },
  },
  plugins: [],
}

