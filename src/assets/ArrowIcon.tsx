import { FC } from 'react';

import { Direction, SVGElementProps } from 'typings';
import { Container } from 'styles/assets/ArrowIcon';

interface Props extends SVGElementProps {
  direction?: Direction;
}

const ArrowIcon: FC<Props> = ({ direction = 'right', ...rest }) => (
  <Container
    $direction={direction}
    width="9"
    height="15"
    viewBox="0 0 9 15"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g clipPath="url(#clip0)">
      <path d="M2.66219 7.50028L8.26724 2.12592C8.68178 1.72813 8.68178 1.0849 8.26724 0.691348C7.85271 0.293561 7.18239 0.297792 6.76786 0.691348L0.417526 6.78088C0.0162208 7.16597 0.00740103 7.78381 0.386657 8.18159L6.76345 14.3134C6.97072 14.5123 7.24413 14.6097 7.51314 14.6097C7.78215 14.6097 8.05556 14.5123 8.26283 14.3134C8.67737 13.9157 8.67737 13.2724 8.26283 12.8789L2.66219 7.50028Z" />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="8.68421" height="15" />
      </clipPath>
    </defs>
  </Container>
);

export default ArrowIcon;
