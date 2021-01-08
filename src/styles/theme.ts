import { toRGBA } from '../utils/general';

const baseColors = {
  primary: '#000214',
  primaryLight: '#3c3b43',
  primaryLighter: '#7B7D8B',
  primaryOnHover: '#060A26',
  secondaryWhite: '#ffffff',
  secondaryBeige: '#ebddd6',
};

const theme = {
  general: {
    padding: {
      normal: '1.6rem',
      small: '1.4rem',
    },
    borderRadius: {
      normal: '1rem',
      small: '0.7rem',
    },
    fontSize: {
      medium: '1.7rem',
      normal: '1.6rem',
      small: '1.3rem',
      tiny: '1.1rem',
    },
    transitionDuration: '0.15s',
    boxShadowBase: `0px 4px 4px ${toRGBA(baseColors.primary, 0.25)}`,
    secondaryBoxShadowOnFocus: `0px 0px 4px 1px ${toRGBA(
      baseColors.secondaryBeige,
      0.65,
    )}`,
  },

  colors: { ...baseColors },
};

export default theme;
