module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slider: {
          '0%': { transform: 'translateX(-1000px)', opacity: '0' },
          '100%': { transform: 'translateX(0px)', opacity: '1' }
        },
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        scaledown: {
          '0%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' }
        },
        moveup: {
          '0%': { bottom: '-25px' },
          '100%': { bottom: '15px' }
        },
        fadeintext: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        focusinexpand: {
          '0%': {
            'letter-spacing': '-.5em',
            filter: 'blur(12px)',
            opacity: '0'
          },
          '100%': { filter: 'blur(0)', opacity: '1' }
        },
        scaleinbl: {
          '0%': {
            transform: 'scale(0)',
            'transform-origin': '0 100%',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(1)',
            'transform-origin': '0 100%',
            opacity: '1'
          }
        }
      },
      animation: {
        slider: 'slider 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        fadein: 'fadein 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        scaledown: 'scaledown 0.2s linear',
        moveup: 'moveup 0.5s ease-out',
        fadeintext: 'fadeintext 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        focusinexpand: 'focusinexpand .5s cubic-bezier(.25,.46,.45,.94) both',
        scaleinbl: 'scaleinbl .5s cubic-bezier(.25,.46,.45,.94) both'
      }
    }
  },
  plugins: []
}
