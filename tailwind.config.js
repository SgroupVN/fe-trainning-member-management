module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans JP', 'Sans-serif'],
      },
      colors: {
        popup: 'rgba(26,27,40,0.78)',
        header: '#424242',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@headlessui/tailwindcss')],
}
