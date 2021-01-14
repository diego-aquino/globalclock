import styled from 'styled-components';

import { Layout, Button } from 'components/common';
import { SmartLocationInput } from 'components/home';
import { SelectWithEnterHint as SuggestionSelectWithEnterHint } from 'styles/components/common/smartInput/Suggestion';

export const StyledLayout = styled(Layout)`
  min-width: 200px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;

  ${SuggestionSelectWithEnterHint} {
    @media (max-width: 450px) {
      display: none;
    }
  }
`;

export const StyledSmartLocationInput = styled(SmartLocationInput)`
  width: calc(100vw - 22.7rem);
  max-width: 46rem;

  @media (max-width: 580px) {
    width: calc(100vw - 9.3rem);
  }

  @media (max-width: 300px) {
    width: calc(100vw - 8.3rem);
  }
`;

export const StyledButton = styled(Button)`
  margin-left: 1.3rem;

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;
