/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sideBarBg: 'rgba(255, 255, 255, 0.05)',
        sideBarPopupBg: '#2a213a',
        sideBarRightBg: '#120822',
        alphaBg: 'rgba(255, 255, 255, 0.1)',
        layoutBg: '#170f23',
        playerBg: '#130c1c',
        headerBg: 'rgba(23,15,35,0.8)',
        artistBg: 'rgba(41,21,71,0.8)',
        overlayBg: "rgba(0,0,0, 0.5)",
        primaryBg: '#34224f',
        purplePrimary: '#9b4de0',
        purpleSecondary: '#c273ed',
        textSecondary: 'rgba(255, 255, 255, 0.5)',
        navigationText: '#dadada',
        progressBarBg: 'rgba(255, 255, 255, 0.3)'
      },
      fontFamily: {
        'Roboto': ['Roboto', 'sans-serif'],
      },
      keyframes: {
        'rotate': {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'rotate-pause': {
          '0%': {
            transform: 'rotate(0)',
            borderRadius: '999px'
          },
          '100%': { transform: 'rotate(360deg)' },
        },
        'scale-up': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' }
        },
        'scale-down': {
          '0%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' }
        },
        'rotate-album-disk': {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(90deg)' },
        },
      },
      animation: {
        'rotate': 'rotate 8s linear infinite',
        'rotate-pause': 'rotate-pause 0.5s linear 1',
        'scale-up': 'scale-up 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'scale-down': 'scale-down 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'rotate-album-disk': 'rotate-album-disk 0.3s linear both',
      }
    },
    objectPosition: {
      '50-20': '50% 20%',
    },
    screens: {
      '768': '768px',
      '1024': '1024px',
      '1280': '1280px',
      '1591': '1591px',
    },
  },
  plugins: [],
}