import styled from 'styled-components';

import { Layout } from 'components/common';
import { SmartLocationInput } from 'components/home';

export const StyledLayout = styled(Layout)`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #dddddd; /* TEMPORARY */
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledSmartLocationInput = styled(SmartLocationInput)`
  width: 40rem;
`;
