/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Ajusta según la estructura de tu proyecto
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}', // Incluye los componentes de Tremor
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}