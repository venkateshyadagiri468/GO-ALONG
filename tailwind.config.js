const { hairlineWidth, platformSelect } = require('nativewind/theme');

module.exports = {
  darkMode: 'class',
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        sans: platformSelect({
          ios: 'System',
          android: 'sans-serif',
          default: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
        }),
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
