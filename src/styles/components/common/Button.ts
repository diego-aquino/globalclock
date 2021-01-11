import { LoadingIcon } from 'assets';
import styled, { css, keyframes } from 'styled-components';

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

  font-size: ${theme.general.fontSize.medium};

  position: relative;

  box-shadow: ${theme.general.boxShadowBase};
  transition: background-color ${theme.general.transitionDuration},
    opacity ${theme.general.transitionDuration},
    box-shadow ${theme.general.transitionDuration};

  :hover {
    cursor: pointer;
  }

  ${({ styleMode }) => styleMode === 'primary' && primaryButtonStyles}
`;

export const PrimaryWrapper = styled.div<{ isHidden?: boolean }>`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
  transition: opacity ${theme.general.transitionDuration};
`;

const customLoadingIconRotate = keyframes`
  0% {
    transform: rotate(0deg) translate(-50%, -50%);
  } 100% {
    transform: rotate(360deg) translate(-50%, -50%);
  }
`;

export const StyledLoadingIcon = styled(LoadingIcon)`
  position: absolute;
  top: 50%;
  left: 50%;

  transform-origin: 0 0;
  animation-name: ${customLoadingIconRotate};
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
