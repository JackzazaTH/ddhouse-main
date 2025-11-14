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
        sans: ['var(--font-inter)', 'var(--font-noto-sans-thai)', 'sans-serif'],
      },
      colors: {
        primary: '#b91c1c', // red-800
        secondary: '#dc2626', // red-600
        accent: '#f87171', // red-400
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
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-down': 'fade-in-down 0.6s ease-out both',
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
        'slide-in-up': 'slide-in-up 0.8s ease-out both',
      },
      typography: ({ theme }: { theme: any }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray[800]'),
            '--tw-prose-headings': theme('colors.primary'),
            '--tw-prose-lead': theme('colors.gray[700]'),
            '--tw-prose-links': theme('colors.secondary'),
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