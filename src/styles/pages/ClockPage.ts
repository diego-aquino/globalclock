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
  max-height: 1080px;
  margin: 0 auto;
  padding: 5rem 12rem 10rem;

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  color: #fff;
`;

export const Location = styled.p`
  margin-top: -1.6rem;

  font-size: 2.1rem;
  font-weight: 600;
  letter-spacing: 0.18rem;
  word-spacing: 0.3rem;
  text-transform: uppercase;
`;
