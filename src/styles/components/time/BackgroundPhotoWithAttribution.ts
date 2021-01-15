import styled from 'styled-components';

import { toRGBA } from 'utils/general';
import theme from 'styles/theme';

export const Attribution = styled.div`
  padding: 0.4rem 0.8rem;
  border-top-left-radius: ${theme.general.borderRadius.small};

  position: absolute;
  right: 0;
  bottom: 0;

  font-size: ${theme.general.fontSize.small};
  color: ${toRGBA(theme.colors.secondaryWhite, 0.9)};
  text-align: right;

  background-color: ${toRGBA(theme.colors.primary, 0.7)};
`;
