import styled from 'styled-components';

import theme from 'styles/theme';

export const Container = styled.div`
  > p {
    margin-bottom: 0.5rem;

    font-size: ${theme.general.fontSize.small};
    color: ${theme.colors.primary};
    opacity: 0.65;
  }

  & + & {
    margin-top: 1rem;
  }
`;
