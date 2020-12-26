import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: -1.6rem;

  display: flex;
  align-items: center;

  font-size: 1.6rem;
  letter-spacing: 0.18rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.clockPage.primaryTextDim};

  svg {
    margin-right: 0.7rem;
  }
`;
