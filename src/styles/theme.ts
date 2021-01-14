import { toRGBA } from '../utils/general';

const baseColors = {
  primary: '#000214',
  primaryLight: '#3c3b43',
  primaryLighter: '#7B7D8B',
  primaryOnHover: '#060A26',
  secondaryWhite: '#ffffff',
  secondaryBeige: '#ebddd6',
} as const;

const theme = {
  general: {
    padding: {
      normal: '1.5rem',
      small: '1.35rem',
      tiny: '1rem',
    },
    borderRadius: {
      normal: '1rem',
      small: '0.7rem',
    },
    fontSize: {
      medium: '1.85rem',
      normal: '1.7rem',
      small: '1.45rem',
      tiny: '1.35rem',
    },
    transitionDuration: '0.15s',
    boxShadowBase: `0px 4px 4px ${toRGBA(baseColors.primary, 0.25)}`,
    secondaryBoxShadowOnFocus: `0px 0px 0px 2px ${toRGBA(
      baseColors.secondaryBeige,
      0.4,
    )}`,
  },

  colors: { ...baseColors },
} as const;

export default theme;
