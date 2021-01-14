import styled from 'styled-components';

import theme from 'styles/theme';

export const Container = styled.div`
  display: flex;
  align-items: center;

  font-size: ${theme.general.fontSize.medium};
  letter-spacing: 0.1rem;
  word-spacing: 0.2rem;
  text-transform: uppercase;
  color: ${theme.colors.secondaryWhite};

  opacity: 0.9;

  svg {
    width: 2.1rem;
    height: 2.1rem;
    margin-right: 0.7rem;
  }
`;
