/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(210, 90%, 50%)",
        accent: "hsl(30, 90%, 60%)",
        background: "hsl(200, 10%, 95%)",
        surface: "hsl(0, 0%, 100%)",
        "text-primary": "hsl(210, 20%, 20%)",
        "text-secondary": "hsl(210, 20%, 40%)",
        dark: {
          bg: "hsl(220, 20%, 8%)",
          surface: "hsl(220, 20%, 12%)",
          border: "hsl(220, 20%, 18%)",
          text: "hsl(0, 0%, 95%)",
          "text-secondary": "hsl(0, 0%, 70%)"
        }
      },
      fontSize: {
        'display': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'heading': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.75' }],
        'caption': ['0.875rem', { fontWeight: '500' }]
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
        'modal': '0 8px 24px hsla(210, 20%, 20%, 0.12)',
        'dark-card': '0 4px 12px hsla(0, 0%, 0%, 0.3)',
        'dark-modal': '0 8px 24px hsla(0, 0%, 0%, 0.4)'
      },
      animation: {
        'fade-in': 'fadeIn 250ms cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 250ms cubic-bezier(0.22,1,0.36,1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}