const baseColors = {
  primary: '#ffffff',
  primaryDark: '#efefef',
  primaryDarker: '#e0e0e0',
  primaryDarkest: '#d7d7d7',
  secondary: '#0a0808',
  secondaryLight: '#555552',
  secondaryLighter: '#a1a2a0',
  tertiary: '#e1c5b9',
  tertiaryLight: '#f4ece9',
  detail: '#0083e0',
};

const theme = {
  general: {
    padding: '1.5rem',
    borderRadius: '0.7rem',
    fontSize: {
      normal: '1.75rem',
    },
    transitionDuration: '0.15s',
    boxShadowOnFocus: '0px 0px 7px 1px rgba(0, 0, 0, 0.2)',
  },

  colors: {
    ...baseColors,

    primaryText: baseColors.primary,
    primaryTextDim: baseColors.primary,
    secondaryText: baseColors.secondary,
  },
};

export default theme;
