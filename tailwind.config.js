/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'hsl(210, 90%, 50%)',
        accent: 'hsl(30, 90%, 60%)',
        bg: 'hsl(200, 10%, 95%)',
        surface: 'hsl(0, 0%, 100%)',
        'text-primary': 'hsl(210, 20%, 20%)',
        'text-secondary': 'hsl(210, 20%, 40%)',
        dark: {
          bg: 'hsl(210, 30%, 8%)',
          surface: 'hsl(210, 25%, 12%)',
          border: 'hsl(210, 20%, 20%)',
          text: 'hsl(210, 10%, 90%)',
          'text-secondary': 'hsl(210, 10%, 70%)'
        }
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '24px'
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        'xxl': '24px'
      },
      boxShadow: {
        'card': '0 4px 12px hsla(210, 20%, 20%, 0.1)',
        'modal': '0 8px 24px hsla(210, 20%, 20%, 0.12)'
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
        'slow': '400ms'
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22,1,0.36,1)'
      },
      maxWidth: {
        'container': '1152px'
      }
    },
  },
  plugins: [],
}