import styled from 'styled-components';

import { toRGBA } from 'utils/general';

export const Container = styled.div`
  margin-bottom: -1.5rem;

  display: flex;
  align-items: center;

  font-size: 1.7rem;
  letter-spacing: 0.18rem;
  text-transform: uppercase;
  color: ${({ theme }) => toRGBA(theme.colors.secondaryWhite, 0.9)};

  svg {
    width: 2.2rem;
    height: 2.2rem;
    margin-right: 0.7rem;
  }
`;
