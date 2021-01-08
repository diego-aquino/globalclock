import styled, { css } from 'styled-components';

import theme from 'styles/theme';

const inputIconSize = '2rem';

interface StyledInputProps {
  hasIcon: boolean;
}

export const Container = styled.div`
  position: relative;
`;

export const IconWrapper = styled.div`
  width: ${inputIconSize};
  height: ${inputIconSize};

  position: absolute;
  top: 50%;
  left: ${theme.general.padding.normal};
  transform: translateY(-50%);

  > svg {
    width: 100%;
    height: 100%;
    stroke: ${theme.colors.primaryLight};
  }
`;

export const StyledInput = styled.input<StyledInputProps>`
  padding: ${theme.general.padding.normal};
  border: none;
  border-radius: ${theme.general.borderRadius.normal};
  outline: none;

  font-size: ${theme.general.fontSize.medium};
  color: ${theme.colors.primary};

  box-shadow: ${theme.general.boxShadowBase};
  transition: box-shadow ${theme.general.transitionDuration};

  ${({ hasIcon }) =>
    hasIcon &&
    css`
      padding-left: ${2 * parseFloat(theme.general.padding.normal) +
      parseFloat(inputIconSize)}rem;
    `}

  :focus {
    box-shadow: ${theme.general.boxShadowBase},
      ${theme.general.secondaryBoxShadowOnFocus};
  }
`;
