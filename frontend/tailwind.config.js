/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.js',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  // safelist: [
  //   {pattern: /(bg|text|border)-./},
  //   {pattern: /(bg|text)-./, variants: ['hover','focus','active'] }
  // ],
  theme: {
    fontFamily: {
      'table': ['Roboto', 'sans-serif'],
    },
    fontSize: {
      xxs: ['10px', '16px'],
      xs: ['12px', '18px'],
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
      '2xl': ['26px', '34px'],
      '3xl': ['28px', '36px'],
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwindcss-animated'),
  ]
}
