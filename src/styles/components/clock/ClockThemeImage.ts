import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;

  img {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;

  background-color: rgba(0, 0, 0, 0.35);
`;
