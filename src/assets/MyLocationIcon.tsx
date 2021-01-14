import { FC } from 'react';

import { SVGElementProps } from 'typings';

const MyLocationIcon: FC<SVGElementProps> = (props) => (
  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M18.1273 9.09091C17.7091 5.3 14.7 2.29091 10.9091 1.87273V0H9.09091V1.87273C5.3 2.29091 2.29091 5.3 1.87273 9.09091H0V10.9091H1.87273C2.29091 14.7 5.3 17.7091 9.09091 18.1273V20H10.9091V18.1273C14.7 17.7091 17.7091 14.7 18.1273 10.9091H20V9.09091H18.1273ZM10 16.3636C6.48182 16.3636 3.63636 13.5182 3.63636 10C3.63636 6.48182 6.48182 3.63636 10 3.63636C13.5182 3.63636 16.3636 6.48182 16.3636 10C16.3636 13.5182 13.5182 16.3636 10 16.3636Z"
      fill="white"
    />
    <circle cx="10" cy="10" r="3" fill="white" />
  </svg>
);

export default MyLocationIcon;
