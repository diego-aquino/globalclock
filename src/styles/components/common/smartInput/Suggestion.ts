import styled from 'styled-components';

import { ReturnKeyIcon } from 'assets';
import { toRGBA } from 'utils/general';
import theme from 'styles/theme';

interface HighlightProps {
  highlighted: boolean;
}

export const Container = styled.button<HighlightProps>`
  width: 100%;
  padding: 0.8rem 1.4rem;
  border: none;
  border-radius: ${theme.general.borderRadius.small};
  outline: none;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  text-align: left;

  background-color: ${({ highlighted }) =>
    highlighted && toRGBA(theme.colors.primaryLighter, 0.18)};
  transition: background-color ${theme.general.transitionDuration};

  :hover {
    cursor: pointer;
  }

  :active {
    background-color: ${theme.colors.secondaryWhite};
  }

  ::after {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: ${theme.general.borderRadius.small};

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    background-color: ${theme.colors.secondaryWhite};
  }
`;

export const IconWrapper = styled.div<HighlightProps>`
  width: 1.4rem;
  height: 100%;
  margin-right: 1.1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    width: 100%;
    height: 100%;

    fill: ${theme.colors.primary};
    opacity: ${({ highlighted }) => (highlighted ? 0.8 : 0.6)};
  }
`;

export const SuggestionContent = styled.div`
  flex: 1;

  color: ${theme.colors.primary};

  > h4 {
    font-size: ${theme.general.fontSize.normal};
    font-weight: 400;
    opacity: 0.9;
    margin-bottom: -0.1rem;
  }

  > p {
    font-size: ${theme.general.fontSize.tiny};
    opacity: 0.7;
  }
`;

interface SelectWithEnterHintProps {
  active?: boolean;
}

export const SelectWithEnterHint = styled.div<SelectWithEnterHintProps>`
  display: ${({ active }) => (active ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  font-size: ${theme.general.fontSize.tiny};
  color: ${toRGBA(theme.colors.primaryOnHover, 0.55)};
`;

export const StyledReturnKeyIcon = styled(ReturnKeyIcon)`
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.6rem;

  fill: ${theme.colors.primaryOnHover};
  opacity: 0.4;
`;
