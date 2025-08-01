/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
      },
      colors: {
        // Base Colors
        'highstrat': '#0e0934', // Deep Indigo
        'accent-pink': '#bf2e8a', // Vibrant Pink
        'accent-blue': '#7ac5d7', // Light Blue

        // Extended Indigo Palette
        'indigo': {
          50: '#eeeef2',
          100: '#d1d1e1',
          200: '#a3a3c4',
          300: '#7575a7',
          400: '#47478a',
          500: '#2a2a6d',
          600: '#1e1e50',
          700: '#0e0934', // Base Indigo
          800: '#09091f',
          900: '#04040a',
        },

        // Extended Pink Palette
        'pink': {
          50: '#fce8f3',
          100: '#f8c4e1',
          200: '#f39dce',
          300: '#ee76bb',
          400: '#e94fa8',
          500: '#bf2e8a', // Base Pink
          600: '#9c2571',
          700: '#781c58',
          800: '#55133f',
          900: '#320a25',
        },

        // Extended Blue Palette
        'blue': {
          50: '#eaf7fa',
          100: '#c9eaf2',
          200: '#a9dde9',
          300: '#7ac5d7', // Base Blue
          400: '#5bb8ce',
          500: '#3ca9c2',
          600: '#2d8094',
          700: '#1f5866',
          800: '#123038',
          900: '#06080a',
        },

        // Semantic Colors
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
        'info': '#3b82f6',

        // UI Component Colors
        'card': {
          DEFAULT: '#ffffff',
          dark: '#1a1a2e',
        },
        'primary': {
          dark: '#0e0934',
        },
        'muted': {
          DEFAULT: '#f3f4f6',
          foreground: '#6b7280',
        },
      },
      spacing: {
        // 8pt Grid System
        '4': '0.25rem',    // 4px
        '8': '0.5rem',     // 8px
        '16': '1rem',      // 16px
        '24': '1.5rem',    // 24px
        '32': '2rem',      // 32px
        '40': '2.5rem',    // 40px
        '48': '3rem',      // 48px
        '64': '4rem',      // 64px
        '80': '5rem',      // 80px
        '96': '6rem',      // 96px
        '128': '8rem',     // 128px
      },
      borderRadius: {
        'sm': '0.25rem',   // 4px
        DEFAULT: '0.375rem', // 6px
        'md': '0.5rem',    // 8px
        'lg': '0.75rem',   // 12px
        'xl': '1rem',      // 16px
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],       // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],      // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],    // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],       // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],  // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],    // 36px
        '5xl': ['3rem', { lineHeight: '1' }],            // 48px
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
