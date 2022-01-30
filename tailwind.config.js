module.exports = {
  // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'transparent': 'transparent',
        'black': '#000',
        'white': '#fff',
        'kernel-purple': '#212144',
        'primary': {
          DEFAULT: '#1e293b',
          muted: '#cbd5e1',
          light: '#f1f5f9',
          lighter: '#D4E4E6',
          dark: '#0f172a',
        },
        'secondary': {
          DEFAULT: '#02E2AC',
          light: '#87E4DB',
        },
        'highlight': '#CBF0C1',
        'skin': {
          muted: '#FAFCFC',
          DEFAULT: '#E5EEEF',
        },
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'robotoSlab': ['Roboto Slab', 'serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'noto': ['Noto Sans'],
        'alegreya': ['Alegreya Sans SC', 'sans-serif'],
        'heading': ['Nanum Myeongjo', 'serif'],
        'secondary': ['Futura', 'sans-serif'],
        'primary': ['Libre Franklin', 'sans-serif'],
        'fancy': ['Licorice', 'sans-serif'],
      },
      fontSize: {
        'xxs': '0.69rem',
      },
      boxShadow: {
        'kernel': '0 30px 41px rgba(33, 33, 68, 0.24)',
      },
    },
    container: {
      padding: {
        'DEFAULT': '1rem',
        'sm': '1rem',
        'lg': '1rem',
        'xl': '12rem',
        '2xl': '12rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};