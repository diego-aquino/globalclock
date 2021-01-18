import styled from 'styled-components';

import { toRGBA } from 'utils/general';
import theme from 'styles/theme';

export const Container = styled.div`
  width: 100%;
  max-width: 768px;
  padding: ${theme.general.padding.normal};

  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  align-items: center;

  color: ${theme.colors.secondaryWhite};

  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 100vw;
    height: 100%;
    z-index: -1;
    transform: translateX(-50%);

    opacity: 0.85;

    box-shadow: 0px 4px 4px ${toRGBA(theme.colors.primary, 0.15)};
    background-color: ${toRGBA(theme.colors.primary, 0.9)};
  }
`;

export const ChildrenWrapper = styled.div`
  flex: 1;
`;

export const CloseButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 2rem;
  border: none;
  outline: none;
  border-radius: ${theme.general.borderRadius.tiny};

  cursor: pointer;
  background-color: transparent;

  transition: box-shadow ${theme.general.transitionDuration};

  :focus {
    box-shadow: ${theme.general.secondaryBoxShadowOnFocus};
  }

  :hover > svg {
    opacity: 1;
  }

  > svg {
    width: 100%;
    height: 100%;
    padding: 0.7rem;

    color: ${theme.colors.secondaryWhite};
    opacity: 0.75;
  }
`;
