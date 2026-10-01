const { cssVars } = require('./src/constants/palette');

/** Colours resolve through CSS custom properties so one class works in both schemes. */
const token = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Scan all of `src`: the tone -> class-name maps in `constants/theme.ts` are
  // class name literals too, and would otherwise never be generated.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: {
          DEFAULT: token('surface'),
          pressed: token('surface-pressed'),
          shadow: token('surface-shadow'),
        },
        fg: token('fg'),
        muted: token('muted'),
        border: token('border'),
        accent: {
          DEFAULT: token('accent'),
          pressed: token('accent-pressed'),
          fg: token('accent-fg'),
          shadow: token('accent-shadow'),
        },
        streak: token('streak'),
        success: token('success'),
        danger: token('danger'),
      },
      borderRadius: {
        chip: '10px',
        control: '16px',
        card: '20px',
      },
      // Type scale: every step pins its own line height so vertical rhythm is not
      // left to the platform default.
      fontSize: {
        display: ['30px', { lineHeight: '36px' }],
        title: ['24px', { lineHeight: '30px' }],
        heading: ['20px', { lineHeight: '26px' }],
        subheading: ['18px', { lineHeight: '24px' }],
        'body-lg': ['17px', { lineHeight: '23px' }],
        body: ['16px', { lineHeight: '24px' }],
        label: ['15px', { lineHeight: '20px' }],
        caption: ['14px', { lineHeight: '20px' }],
        micro: ['11px', { lineHeight: '14px' }],
      },
    },
  },
  plugins: [
    // Light is the default set; web picks up dark straight from the media query,
    // and native gets it from the `vars()` applied in the root layout.
    ({ addBase }) =>
      addBase({
        ':root': cssVars('light'),
        '@media (prefers-color-scheme: dark)': { ':root': cssVars('dark') },
      }),
  ],
};
