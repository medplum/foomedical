/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.css', './src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(640px at top left, var(--tw-gradient-stops))',
        'hero-background': "url('./img/homePage/hero-background.jpg')",
      },
      width: {
        128: '28rem',
        156: '38rem',
        216: '54rem',
        264: '76rem',
      },
      height: {
        128: '28rem',
        156: '38rem',
        216: '54rem',
        264: '76rem',
      },
      maxWidth: {
        128: '28rem',
        156: '38rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
