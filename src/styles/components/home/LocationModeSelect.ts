import styled, { css } from 'styled-components';

import { MapIcon, MapMarkerIcon } from 'assets';

export const Container = styled.div`
  width: 21.4rem;

  position: relative;

  background-color: transparent;
`;

const optionIconStyles = css`
  height: 1.9rem;
  width: 1.9rem;
  margin-right: 1rem;

  opacity: 0.6;
`;

export const StyledMapIcon = styled(MapIcon)`
  ${optionIconStyles}
`;

export const StyledMapMarkerIcon = styled(MapMarkerIcon)`
  ${optionIconStyles}
`;
