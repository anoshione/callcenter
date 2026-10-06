import type { Config } from 'tailwindcss';

function withOpacity(variableName: string) {
  return ({ opacityValue }: { opacityValue?: string }) => {
    if (opacityValue !== undefined) {
      return `color-mix(in srgb, var(${variableName}) calc(${opacityValue} * 100%), transparent)`;
    }
    return `var(${variableName})`;
  };
}

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      canvas: '1920px',
    },
    extend: {
      colors: {
        'grey-1': withOpacity('--color-grey-1'),
        'grey-2': withOpacity('--color-grey-2'),
        'grey-3': withOpacity('--color-grey-3'),
        'grey-4': withOpacity('--color-grey-4'),
        'grey-5': withOpacity('--color-grey-5'),
        surface: withOpacity('--color-surface'),
        text: withOpacity('--color-text'),
        'text-2': withOpacity('--color-text-2'),
        primary: {
          DEFAULT: withOpacity('--color-primary'),
          hover: withOpacity('--color-primary-hover'),
          active: withOpacity('--color-primary-active'),
          disabled: withOpacity('--color-primary-disabled'),
        },
        secondary: {
          DEFAULT: withOpacity('--color-secondary'),
          hover: withOpacity('--color-secondary-hover'),
          active: withOpacity('--color-secondary-active'),
          disabled: withOpacity('--color-secondary-disabled'),
        },
        success: withOpacity('--color-success'),
        warning: withOpacity('--color-warning'),
        error: withOpacity('--color-error'),
        offline: withOpacity('--color-offline'),
        'glass-bg': 'var(--glass-bg)',
        'glass-bg-strong': 'var(--glass-bg-strong)',
        'glass-border': 'var(--glass-border)',
        'glass-bg-dark': 'var(--glass-bg-dark)',
        'glass-border-dark': 'var(--glass-border-dark)',
        'orb-green': 'var(--orb-green)',
        'orb-navy': 'var(--orb-navy)',
        'orb-light': 'var(--orb-light)',
      },
      spacing: {
        4: 'var(--space-4)',
        8: 'var(--space-8)',
        12: 'var(--space-12)',
        16: 'var(--space-16)',
        20: 'var(--space-20)',
        24: 'var(--space-24)',
        28: 'var(--space-28)',
        32: 'var(--space-32)',
        48: 'var(--space-48)',
        64: 'var(--space-64)',
        100: 'var(--space-100)',
        section: 'var(--space-section)',
        'section-sm': 'var(--space-section-sm)',
        'section-gap': 'var(--space-section-gap)',
        'frame-inset': 'var(--frame-inset)',
        'page-pad': 'var(--page-pad)',
      },
      borderRadius: {
        4: 'var(--radius-4)',
        8: 'var(--radius-8)',
        12: 'var(--radius-12)',
        16: 'var(--radius-16)',
        20: 'var(--radius-20)',
        24: 'var(--radius-24)',
        28: 'var(--radius-28)',
        32: 'var(--radius-32)',
        64: 'var(--radius-64)',
        round: 'var(--radius-round)',
      },
      fontFamily: {
        roboto: ['var(--font-family)'],
      },
      scale: {
        104: '1.04',
      },
      fontSize: {
        12: ['var(--fs-12)', { lineHeight: 'var(--lh-12)' }],
        13: ['13px', { lineHeight: '18px' }],
        14: ['var(--fs-14)', { lineHeight: 'var(--lh-14)' }],
        15: ['15px', { lineHeight: '22px' }],
        16: ['var(--fs-16)', { lineHeight: 'var(--lh-16)' }],
        17: ['17px', { lineHeight: '24px' }],
        18: ['18px', { lineHeight: '26px' }],
        20: ['var(--fs-20)', { lineHeight: 'var(--lh-20)' }],
        22: ['22px', { lineHeight: '28px' }],
        24: ['var(--fs-24)', { lineHeight: 'var(--lh-24)' }],
        26: ['26px', { lineHeight: '32px' }],
        28: ['var(--fs-28)', { lineHeight: 'var(--lh-28)' }],
        30: ['30px', { lineHeight: '36px' }],
        32: ['var(--fs-32)', { lineHeight: 'var(--lh-32)' }],
        34: ['34px', { lineHeight: '40px' }],
        36: ['var(--fs-36)', { lineHeight: 'var(--lh-36)' }],
        40: ['40px', { lineHeight: '48px' }],
        48: ['var(--fs-48)', { lineHeight: 'var(--lh-48)' }],
        56: ['56px', { lineHeight: '64px' }],
        64: ['64px', { lineHeight: '72px' }],
        72: ['var(--fs-72)', { lineHeight: 'var(--lh-72)' }],
        96: ['var(--fs-96)', { lineHeight: 'var(--lh-96)' }],
      },
      fontWeight: {
        light: 'var(--fw-light)',
        regular: 'var(--fw-regular)',
        medium: 'var(--fw-medium)',
        bold: 'var(--fw-bold)',
      },
      blur: {
        sm: 'var(--blur-sm)',
        md: 'var(--blur-md)',
        lg: 'var(--blur-lg)',
        xl: 'var(--blur-xl)',
        orb: 'var(--blur-orb)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
      },
      transitionDuration: {
        fast: 'var(--dur-fast)',
        base: 'var(--dur-base)',
        slow: 'var(--dur-slow)',
      },
      transitionTimingFunction: {
        'out-custom': 'var(--ease-out)',
      },
    },
  },
  plugins: [],
} satisfies Config;
