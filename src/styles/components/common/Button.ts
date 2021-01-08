import styled, { css } from 'styled-components';

import theme from 'styles/theme';

const buttonIconSize = '2rem';

export type ButtonStyleMode = 'primary';

interface ContainerProps {
  styleMode: ButtonStyleMode;
}

const primaryButtonStyles = css`
  color: ${theme.colors.secondaryWhite};

  background-color: ${theme.colors.primary};

  :hover {
    background-color: ${theme.colors.primaryOnHover};
    opacity: 0.9;
  }

  :focus {
    box-shadow: ${theme.general.boxShadowBase},
      ${theme.general.secondaryBoxShadowOnFocus};
  }
`;

export const Container = styled.button<ContainerProps>`
  padding: ${theme.general.padding.normal};
  border: none;
  border-radius: ${theme.general.borderRadius.normal};
  outline: none;

  display: flex;
  align-items: center;

  font-size: ${theme.general.fontSize.medium};

  box-shadow: ${theme.general.boxShadowBase};
  transition: background-color ${theme.general.transitionDuration},
    opacity ${theme.general.transitionDuration},
    box-shadow ${theme.general.transitionDuration};

  :hover {
    cursor: pointer;
  }

  ${({ styleMode }) => styleMode === 'primary' && primaryButtonStyles}
`;

export const IconWrapper = styled.div<{ hasIcon: boolean }>`
  width: ${buttonIconSize};
  height: ${buttonIconSize};
  margin-right: 1rem;

  display: ${({ hasIcon }) => (hasIcon ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  > svg {
    width: 100%;
    height: 100%;
  }
`;

export const ChildrenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
