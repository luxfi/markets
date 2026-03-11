import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lux: { DEFAULT: '#ffffff', accent: '#e5e5e5' },
      },
    },
  },
  plugins: [],
};

export default config;
