import styled, { css } from 'styled-components';

import { toRGBA } from 'utils/general';
import theme from 'styles/theme';
import { StyledComponentsCSS } from 'typings';

export type AttributionSide = 'left' | 'right';

interface AttributionProps {
  side: AttributionSide;
}

type AttributionSideStyles = {
  [key in AttributionSide]: StyledComponentsCSS;
};

const attributionSideStyles: AttributionSideStyles = {
  left: css`
    border-top-right-radius: ${theme.general.borderRadius.small};
    text-align: left;
    left: 0;
  `,
  right: css`
    border-top-left-radius: ${theme.general.borderRadius.small};
    text-align: right;
    right: 0;
  `,
};

export const Attribution = styled.div<AttributionProps>`
  padding: 0.4rem 0.8rem;

  position: absolute;
  bottom: 0;
  z-index: -9998;

  font-size: ${theme.general.fontSize.small};
  color: ${toRGBA(theme.colors.secondaryWhite, 0.9)};

  background-color: ${toRGBA(theme.colors.primary, 0.7)};

  ${({ side }) => attributionSideStyles[side]}
`;
