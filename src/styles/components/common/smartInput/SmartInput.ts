import { Input } from 'components/common';
import styled, { css } from 'styled-components';

import { toRGBA } from 'utils/general';
import theme from 'styles/theme';

interface ActiveSuggestionProps {
  hasActiveSuggestions: boolean;
}

export const Container = styled.div<ActiveSuggestionProps>`
  position: relative;
`;

export const StyledInput = styled(Input)<ActiveSuggestionProps>`
  ${({ hasActiveSuggestions }) =>
    hasActiveSuggestions &&
    css`
      && {
        transition: none;
        box-shadow: none;

        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom: 1px solid ${toRGBA(theme.colors.primaryLighter, 0.35)};

        :focus {
          box-shadow: none;
        }
      }
    `}
`;

export const SuggestionsContainer = styled.div`
  width: 100%;
  padding: 6.6rem 1.6rem 1rem;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;

  ::after {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: ${theme.general.borderRadius.normal};

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    background-color: ${theme.colors.secondaryWhite};

    box-shadow: ${theme.general.boxShadowBase},
      ${theme.general.secondaryBoxShadowOnFocus};
  }
`;
