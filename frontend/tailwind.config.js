/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.js',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  safelist: [
    {pattern: /(bg|text|border)-./},
    {pattern: /(bg|text)-./, variants: ['hover','focus','active'] }
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
