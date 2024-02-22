/* eslint-disable global-require, jsdoc/valid-types */
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite.{js,ts}',
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  darkMode: ['class', '[class="dark-mode"]'],
  theme: {
    extend: {},
    fontFamily: {
      display: '"Red Hat Display", sans-serif'
    },
    backgroundImage: {
      'gradient-light': 'linear-gradient(180deg, rgba(251, 146, 60, 0.25) 0%, rgba(251, 146, 60, 0.75) 100%)',
      'gradient-dark': 'linear-gradient(180deg, rgba(30, 58, 138, 0.25) 0%, rgba(30, 58, 138, 0.75) 100%)',
      'home-gradient-light': 'linear-gradient(180deg, #FB923C 0%, rgba(251, 146, 60, 0.5) 100%)',
      'home-gradient-dark': 'linear-gradient(180deg, rgba(30, 58, 138, 0.75) 0%, rgba(30, 58, 138, 0.25) 100%)',
      'header-desktop': 'url("https://411posters.com/wp-content/uploads/2013/10/The-Lord-of-the-Rings.png")',
      'header-mobile': 'url("https://411posters.com/wp-content/uploads/2013/10/The-Lord-of-the-Rings.png")'
    },
    dropShadow: {
      'home-title-light': '0px 4px 4px rgba(0, 0, 0, 0.25)',
      'home-title-dark': '0px 4px 4px rgba(255, 255, 255, 0.25)'
    },
    screens: {
      xs: '320px',
      phone: '437px',
      ...defaultTheme.screens
    }
  },
  plugins: [require('@tailwindcss/typography'), require('flowbite/plugin')]
}
