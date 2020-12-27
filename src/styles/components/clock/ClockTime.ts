import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: flex-end;

  h1 {
    font-size: 17.5rem;
    font-family: 'DM Sans', sans-serif;
  }

  p {
    margin: 2rem 0 4.5rem;
    padding: 0 1rem;

    flex: 1;

    font-size: 3.2rem;
    word-wrap: break-word;
  }

  @media (max-width: 1080px) {
    h1 {
      font-size: 16rem;
    }

    p {
      font-size: 2.9rem;
    }
  }

  @media (max-width: 768px) {
    padding: 0.8rem 0;

    h1 {
      font-size: 13.5rem;
    }

    p {
      margin-bottom: 4.4rem;
      font-size: 2.5rem;
    }
  }

  @media (max-width: 640px) {
    padding: 1.8rem 0;

    h1 {
      font-size: 11rem;
    }

    p {
      margin-bottom: 3rem;
      font-size: 2.3rem;
    }
  }

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: flex-start;

    h1 {
      margin-top: 1rem;
      font-size: 10rem;
    }

    p {
      margin-top: -1.5rem;
    }
  }

  @media (max-width: 400px) {
    h1 {
      font-size: 8.5rem;
    }

    p {
      font-size: 2.2rem;
    }
  }
`;
