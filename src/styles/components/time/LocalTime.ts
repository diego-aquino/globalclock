import styled from 'styled-components';

import Time from 'components/time/Time';

export const Container = styled.div`
  margin: -1.5rem 0;

  display: flex;
  align-items: flex-end;
  opacity: 0.85;

  @media (max-width: 768px) {
    margin: 0;
  }

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: flex-start;
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

export const TimeZone = styled.p`
  margin: 2rem 0 4.5rem;
  padding: 0 0.5rem;

  flex: 1;

  font-size: 3.2rem;
  word-wrap: break-word;

  @media (max-width: 1080px) {
    font-size: 2.9rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 4.4rem;
    font-size: 2.5rem;
  }

  @media (max-width: 640px) {
    margin-bottom: 3rem;
    font-size: 2.3rem;
  }

  @media (max-width: 520px) {
    margin-top: -1.5rem;
  }

  @media (max-width: 400px) {
    font-size: 2.2rem;
  }
`;
