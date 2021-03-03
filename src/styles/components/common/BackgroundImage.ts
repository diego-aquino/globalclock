import styled from 'styled-components';
import { Blurhash } from 'react-blurhash';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  z-index: -9999;

  img {
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;
    z-index: -9998;

    object-fit: cover;
  }
`;

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;
  z-index: -9997;

  background-color: rgba(0, 0, 0, 0.5);
`;

interface ToggleVisible {
  $visible?: boolean;
}

export const StyledBlurhash = styled(Blurhash)<ToggleVisible>`
  width: 100vw !important;
  height: 100vh !important;

  transition: opacity 0.15s;
  transition-delay: 0.35s;

  opacity: ${({ $visible = true }) => ($visible ? 1 : 0)};
`;
