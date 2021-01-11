import { FC } from 'react';

import { SVGElementProps } from 'typings';

const ReturnKeyIcon: FC<SVGElementProps> = (props) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="15" height="15" rx="3" />
    <rect width="10" height="9" transform="translate(2 3)" />
    <path
      d="M5.45258 11.0322L2.88062 8.32491L5.45258 5.61758"
      stroke="white"
      strokeWidth="1.33295"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.44828 8.35372H10.9914C10.9914 8.35372 11 8.09944 11 5.61758L10.9914 3.72548"
      stroke="white"
      strokeWidth="1.33295"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ReturnKeyIcon;
