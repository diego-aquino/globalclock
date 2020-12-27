import styled from 'styled-components';
import { Layout } from 'components/common';

export const StyledLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1520px;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 5rem 12rem 10rem;

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  color: #fff;

  @media (max-width: 1080px) {
    padding: 5rem 8rem 10rem;
  }

  @media (max-width: 768px) {
    padding: 5rem 5rem 10rem;
  }

  @media (max-width: 640px) {
    padding: 5rem 2rem 10rem;
  }
`;

export const Location = styled.p`
  margin-top: -1.6rem;

  font-size: 2.1rem;
  font-weight: 600;
  letter-spacing: 0.18rem;
  word-spacing: 0.3rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.9rem;
  }

  @media (max-width: 640px) {
    font-size: 1.8rem;
  }
`;
