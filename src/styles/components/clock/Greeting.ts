import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: -1.5rem;

  display: flex;
  align-items: center;

  font-size: 1.7rem;
  letter-spacing: 0.18rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primaryTextDim};

  svg {
    width: 2.2rem;
    height: 2.2rem;
    margin-right: 0.7rem;
  }
`;
