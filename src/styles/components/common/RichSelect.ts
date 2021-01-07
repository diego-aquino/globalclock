import styled, { css, keyframes } from 'styled-components';

import { ArrowIcon } from 'assets';
import theme from 'styles/theme';

interface ContainerProps {
  isFocused: boolean;
}

interface OptionProps {
  isPrecededByOption?: boolean;
  isFollowedByOption?: boolean;
  isSelected?: boolean;
}

interface CollapsibleOptionsContainerProps {
  isOpen: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 21.4rem;
  margin-left: 1rem;
  border-radius: ${theme.general.borderRadius.normal};

  position: relative;

  background-color: transparent;
  box-shadow: ${({ isFocused }) =>
    isFocused && theme.general.secondaryBoxShadowOnFocus};
  transition: box-shadow ${theme.general.transitionDuration};
`;

export const Option = styled.button<OptionProps>`
  width: 100%;
  border: none;
  outline: none;
  padding: ${theme.general.padding.normal};

  border-radius: ${theme.general.borderRadius.normal};
  ${({ isPrecededByOption, isFollowedByOption }) => css`
    ${isPrecededByOption &&
    css`
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    `}

    ${isFollowedByOption &&
    css`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}
  `}

  display: flex;
  align-items: center;

  font-size: ${theme.general.fontSize.normal};

  background-color: ${({ isSelected }) =>
    isSelected ? theme.colors.primaryLight : theme.colors.primaryLighter};
  transition: background-color ${theme.general.transitionDuration};

  :hover {
    background-color: ${theme.colors.primaryLight};
  }
`;

export const SelectedOption = styled(Option)`
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
  }
`;

export const StyledArrowIcon = styled(ArrowIcon)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const boxShadowFadeIn = keyframes`
  from {
    box-shadow: none
  } to {
    box-shadow: ${theme.general.secondaryBoxShadowOnFocus};
  }
`;

export const CollapsibleOptionsContainer = styled.div<CollapsibleOptionsContainerProps>`
  width: 100%;
  padding-top: 0.75rem;
  border-bottom-left-radius: ${theme.general.borderRadius.normal};
  border-bottom-right-radius: ${theme.general.borderRadius.normal};

  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};

  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;

  background-color: ${theme.colors.secondaryWhite};

  animation: ${boxShadowFadeIn} ${theme.general.transitionDuration} forwards;
`;

export const Separator = styled.div`
  width: 100%;
  height: 1.45rem;

  position: absolute;
  top: -0.7rem;
  left: 50%;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: translateX(-50%);

  background-color: ${theme.colors.secondaryWhite};

  ::after {
    content: '';
    width: 90%;
    height: 0.1rem;

    background-color: ${theme.colors.primaryLighter};
    opacity: 0.65;
  }
`;
