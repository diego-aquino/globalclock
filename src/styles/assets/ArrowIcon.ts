import styled from 'styled-components';

import { Direction, SVGElementProps } from 'typings';

const rotationDegreesFor: { [key in Direction]: number } = {
  up: -90,
  right: 0,
  down: 90,
  left: 180,
};

interface IconProps extends SVGElementProps {
  direction: Direction;
}

export const AdaptiveIcon = styled.svg<IconProps>`
  transform: ${({ direction }) =>
    `rotate(${rotationDegreesFor[direction]}deg)`};
`;
