/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			dark: {
  				bg: '#004d40',
  				secondary: '#00796b',
  				tertiary: '#4B4453',
  				text: '#E0E0E0',
  				select: '#007bff'
  			},
  			button: {
  				unselected: '#616161',
  				selected: '#007bff'
  			},
  			title: '#B39DDB'
  		},
  		accent: {
  			primary: '#4CAF50',
  			secondary: '#388E3C',
  			alert: '#D32F2F',
  			success: '#388E3C',
  			error: '#F57C00'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [],
}