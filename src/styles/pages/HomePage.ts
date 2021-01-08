import styled from 'styled-components';

import { Layout, Button } from 'components/common';
import { SmartLocationInput } from 'components/home';

export const StyledLayout = styled(Layout)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledSmartLocationInput = styled(SmartLocationInput)`
  width: 46rem;
  margin-right: 1.3rem;
`;

export const StyledButton = styled(Button)`
  width: 19rem;
`;
