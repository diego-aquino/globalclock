import styled from 'styled-components';
import { Button, Layout } from 'components/common';

export const StyledLayout = styled(Layout)`
  min-width: 300px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1520px;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 10rem 12rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  color: #fff;

  @media (max-width: 1080px) {
    padding: 10rem 8rem;
  }

  @media (max-width: 768px) {
    padding: 10rem 5rem;
  }

  @media (max-width: 640px) {
    padding: 10rem 2rem;
  }

  @media (max-height: 768px) {
    padding-bottom: 6rem;
  }
`;

export const BackButton = styled(Button)`
  padding: ${({ theme }) => theme.general.padding.tiny};
  border-radius: ${({ theme }) => theme.general.borderRadius.small};

  position: absolute;
  top: 1.5rem;
  left: 1.5rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const LocationLabel = styled.p`
  font-size: ${({ theme }) => theme.general.fontSize.large};
  font-weight: 600;
  letter-spacing: 0.15rem;
  word-spacing: 0.25rem;
  text-transform: uppercase;

  opacity: 0.85;

  @media (max-width: 768px) {
    font-size: 1.9rem;
  }

  @media (max-width: 640px) {
    font-size: 1.8rem;
  }
`;
