module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx}"]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#222222',
        secondary: '#FFCA18',
        grey: '#F5F5F5',
        lightGrey: '#999999',
        processbg: '#263238',
        dashboardGrey: "#F4F5F7"
      },
      height:{
        '600': '600px',
        '500' : '500px',
        '550' : '550px',
        '700' : '700px',
        '420' : '420px',
        '90vh' : '90vh',
        '80vh' : '80vh'
      },
      zIndex:{
        '-1':'-1'
      },
      keyframes:{
        showcase:{
          '0%' : {transform: 'translateX(50%)'},
          '100%' : {transform: 'translateX(-50%)'},
        }
      },
      animation:{
        'showcase-slide':'showcase 120s linear infinite'
      },
      width:{
        '150p': '150%'
      }
    },
    fontFamily : {
      playfair: ['Playfair Display'],
    }
  },
  variants: {
    extend: {
      display: ['hover','group-hover'],
    },
  },
  plugins: [],
}
