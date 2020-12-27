import styled from 'styled-components';

import Time from 'components/clock/Time';

export const Container = styled.div`
  display: flex;
  align-items: flex-end;

  p {
    margin: 2rem 0 4.5rem;
    padding: 0 1rem;

    flex: 1;

    font-size: 3.2rem;
    word-wrap: break-word;
  }

  @media (max-width: 1080px) {
    p {
      font-size: 2.9rem;
    }
  }

  @media (max-width: 768px) {
    padding: 0.8rem 0;

    p {
      margin-bottom: 4.4rem;
      font-size: 2.5rem;
    }
  }

  @media (max-width: 640px) {
    padding: 1.8rem 0;

    p {
      margin-bottom: 3rem;
      font-size: 2.3rem;
    }
  }

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: flex-start;

    p {
      margin-top: -1.5rem;
    }
  }

  @media (max-width: 400px) {
    p {
      font-size: 2.2rem;
    }
  }
`;

export const StyledTime = styled(Time)`
  font-size: 17.5rem;
  font-family: 'DM Sans', sans-serif;

  @media (max-width: 1080px) {
    font-size: 16rem;
  }

  @media (max-width: 768px) {
    font-size: 13.5rem;
  }

  @media (max-width: 640px) {
    font-size: 11rem;
  }

  @media (max-width: 520px) {
    margin-top: 1rem;
    font-size: 10rem;
  }

  @media (max-width: 400px) {
    font-size: 8.5rem;
  }
`;
