import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-noto-sans-thai)', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#C62828', // Red 800 -> A slightly more vibrant deep red
        primaryLight: '#D32F2F', // Red 700 -> Hover state
        primaryDark: '#B71C1C', // For active states
        secondary: '#1F2937', // Gray 800
        secondaryLight: '#374151', // Gray 700
        accent: '#D4AF37', // Gold-ish
        accentLight: '#E5C158',
        background: '#FAFAFA', // Very light gray/white
        surface: '#FFFFFF',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.03), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'soft-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.03), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glow': '0 0 15px rgba(198, 40, 40, 0.3)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-down': {
            '0%': { opacity: '0', transform: 'translateY(-20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-up': {
            '0%': { opacity: '0', transform: 'translateY(40px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'zoom-in': {
            '0%': { opacity: '0', transform: 'scale(0.95)' },
            '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out both',
        'fade-in-down': 'fade-in-down 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'slide-in-up': 'slide-in-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'zoom-in': 'zoom-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'float': 'float 3s ease-in-out infinite',
      },
      typography: ({ theme }: { theme: any }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray[600]'),
            '--tw-prose-headings': theme('colors.gray[900]'),
            '--tw-prose-lead': theme('colors.gray[500]'),
            '--tw-prose-links': theme('colors.primary'),
            '--tw-prose-bold': theme('colors.gray[800]'),
          },
        },
      }),
    },
  },
  plugins: [
    typography,
  ],
};
export default config;