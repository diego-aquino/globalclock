const baseColors = {
  primary: '#ffffff',
  primaryDark: '#efefef',
  primaryDarker: '#e0e0e0',
  primaryDarkest: '#d7d7d7',
  secondary: '#0a0808',
  secondaryLight: '#0a0808bf',
  secondaryLighter: '#0a080899',
  secondaryLightest: '#0a080859',
  tertiary: '#e1c5b9',
  tertiaryLight: '#f4ece9',
  detail: '#1890ff',

  green: '#52c41a',
  yellow: '#faad14',
  red: '#f5222d',
};

const theme = {
  general: {
    padding: '1.2rem',
    borderRadius: '0.7rem',
    fontSize: {
      normal: '1.75rem',
      small: '1.6rem',
    },
    transitionDuration: '0.15s',
    boxShadowBase:
      '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
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
