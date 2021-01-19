import styled from 'styled-components';
import { Blurhash } from 'react-blurhash';

import theme from 'styles/theme';
import { toRGBA } from 'utils/general';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;
  z-index: -9999;

  background-color: ${toRGBA(theme.colors.primary, 0.15)};
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  background-color: rgba(0, 0, 0, 0.5);
`;

interface ToggleVisible {
  $visible?: boolean;
}

export const StyledBlurhash = styled(Blurhash)<ToggleVisible>`
  width: 2rem;
  height: 2rem;

  transition: opacity 0.15s;
  transition-delay: 0.35s;

  opacity: ${({ $visible = true }) => ($visible ? 1 : 0)};
`;
