import { FC } from 'react';

import { SVGElementProps } from 'typings';

const MoonIcon: FC<SVGElementProps> = (props) => (
  <svg
    strokeWidth="0"
    viewBox="0 0 20 20"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

export default MoonIcon;
