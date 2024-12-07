/** @type {import('tailwindcss').Config} */
export default {
  content:  [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        screens: {
          iphonepro: "375px",
				laptop: "1280px",

			},

			fontFamily: {
				cinzel: [' "Cinzel Decorative", "sans-serif"'],
			},

      colors: {
				primaryColor: 'hsla(213, 100%, 35%, 1)',
				primaryContainer: 'hsla(204, 100%, 91%, 1)',
				secondaryColor: 'hsla(120, 2%, 33%, 1)',
				contactColor:  'hsla(120, 3%, 34%, 1)',
				placeholderColor: 'hsla(0, 0%, 71%, 1)',
        weatherCard: 'hsla(36, 92%, 60%, 1)',
			},
    },
  },
  plugins: [],
}

