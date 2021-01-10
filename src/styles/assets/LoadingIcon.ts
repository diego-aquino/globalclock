import styled, { keyframes } from 'styled-components';

import theme from 'styles/theme';

export type LoadingIconStyleMode = 'primary' | 'secondaryWhite';

type FillColors = {
  [key in LoadingIconStyleMode]: string;
};

const fillColors: FillColors = {
  primary: theme.colors.primary,
  secondaryWhite: theme.colors.secondaryWhite,
};

interface ContainerProps {
  styleMode: LoadingIconStyleMode;
  isNativeRotationActive?: boolean;
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  } 100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.svg<ContainerProps>`
  width: 2rem;
  height: 2rem;

  fill: ${({ styleMode }) => fillColors[styleMode]};

  animation-name: ${rotate};
  animation-duration: 0.75s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;
