import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

import theme from 'styles/theme';

export const Tooltip = styled(ReactTooltip)`
  padding: 0.7rem 1rem !important;

  z-index: 1;

  font-size: ${theme.general.fontSize.small} !important;
  text-align: center;
`;
