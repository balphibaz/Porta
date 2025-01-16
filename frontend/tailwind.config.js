/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#2C2A4A', // Fondo Primario
          secondary: '#3E3B5B', // Fondo Secundario
          tertiary: '#4B4453', // Fondo Terciario
          text: '#E0E0E0', // Texto
          select:'#007bff',
        },
        button: {
          unselected: '#616161', // Botón Sin Seleccionar
          selected: '#007bff', // Botón Seleccionado
        },
        title: '#B39DDB', // Títulos
      },
      accent: {
        primary: '#4CAF50', // Acento Primario
        secondary: '#388E3C', // Acento Secundario
        alert: '#D32F2F', // Alerta
        success: '#388E3C', // Éxito
        error: '#F57C00', // Error
      },
    },
  },
  plugins: [],
}