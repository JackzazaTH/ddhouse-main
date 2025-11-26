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
        primary: '#991B1B', // Red 800 - Deeper, more premium red
        primaryLight: '#B91C1C', // Red 700 - Hover state
        secondary: '#1F2937', // Gray 800 - Dark contrast
        accent: '#D4AF37', // Gold-ish - For highlights/luxury feel
        background: '#F9FAFB', // Gray 50 - Softer white background
        surface: '#FFFFFF',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-down': {
            '0%': { opacity: '0', transform: 'translateY(-15px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
            '0%': { opacity: '0', transform: 'translateY(15px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-up': {
            '0%': { opacity: '0', transform: 'translateY(30px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'zoom-in': {
            '0%': { opacity: '0', transform: 'scale(0.98)' },
            '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) both',
        'fade-in-down': 'fade-in-down 0.6s cubic-bezier(0.4, 0, 0.2, 1) both',
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) both',
        'slide-in-up': 'slide-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) both',
        'zoom-in': 'zoom-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) both',
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