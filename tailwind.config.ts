import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // TikTok brand colors
        tiktok: {
          red: '#FE2C55',
          cyan: '#25F4EE',
          black: '#010101',
          dark: '#121212',
          card: '#1C1C1C',
          border: '#2A2A2A',
          muted: '#8A8A8A',
        },
        brand: {
          primary: '#FE2C55',
          secondary: '#25F4EE',
          accent: '#FF6B6B',
          glow: 'rgba(254, 44, 85, 0.4)',
          'glow-cyan': 'rgba(37, 244, 238, 0.4)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient-shift': 'gradientShift 4s ease infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(254, 44, 85, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(254, 44, 85, 0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'tiktok-gradient': 'linear-gradient(135deg, #FE2C55 0%, #25F4EE 100%)',
        'dark-gradient': 'linear-gradient(135deg, #121212 0%, #1C1C1C 100%)',
      },
    },
  },
  plugins: [],
}

export default config
