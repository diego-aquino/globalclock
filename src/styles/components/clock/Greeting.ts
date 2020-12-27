import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: -1.5rem;

  display: flex;
  align-items: center;

  font-size: 1.7rem;
  letter-spacing: 0.18rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.clockPage.primaryTextDim};

  svg {
    width: 2.2rem;
    height: 2.2rem;
    margin-right: 0.7rem;
  }

  @media (max-width: 1080px) {
    font-size: 1.85rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;

    svg {
      width: 2.5rem;
      height: 2.5rem;
    }
  }

  @media (max-width: 640px) {
    font-size: 2.1rem;

    svg {
      width: 2.7rem;
      height: 2.7rem;
    }
  }
`;
