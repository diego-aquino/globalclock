import styled from 'styled-components';

import { Direction, SVGElementProps } from 'typings';

const rotationDegreesFor: { [key in Direction]: number } = {
  up: 90,
  right: 180,
  down: -90,
  left: 0,
};

interface ContainerProps extends SVGElementProps {
  $direction: Direction;
}

export const Container = styled.svg<ContainerProps>`
  transition: transform 0.5s;

  transform: ${({ $direction }) =>
    `rotate(${rotationDegreesFor[$direction]}deg)`};
`;
