/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: '#6366F1',
        rose: '#EC4899',
        green: '#14B8A6',
        black: '#1F2937',
        lightBlack: '#283446',
        trueBlack: '#000',
        orange: '#B75721',
      },
      spacing: {
        '0': '0px',
        '0.5': '2px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '18px',
        '6': '20px',
        '7': '24px',
        '8': '32px',
        '9': '36px',
        '10': '48px',
        '11': '60px',
        '12': '72px',
        '13': '96px'
      },
      fontFamily: {
        'primary': ['Bebas Neue', 'serif'],
        'secondary': ['Open-Sans', 'serif']
      },
      fontSize: {
        xs: ['12px', '1.25em'],
        sm: ['14px', '1.25em'],
        base: ['16px', '1.25em'],
        m: ['20px', '1.25em'],
        lg: ['24px', '1.25em'],
        xl: ['32px', '1.25em'],
        xxl: ['48px', '1.25em']
      },
      borderRadius: {
        xxl: '48px'
      },
      container: {
        sm: '640px',
      }
    },
  },
  plugins: [],
}

