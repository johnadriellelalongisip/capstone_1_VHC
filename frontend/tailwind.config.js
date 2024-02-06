/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.js',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  safelist: [
    {pattern: /(bg|text|border)-./},
  ],
  theme: {
    fontFamily: {
      'table': ['Roboto', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwindcss-animated'),
  ]
}
