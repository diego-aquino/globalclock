import { FC } from 'react';

import { SVGElementProps } from 'typings';

const SearchIcon: FC<SVGElementProps> = (props) => (
  <svg
    stroke="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="none"
      strokeMiterlimit="10"
      strokeWidth="32"
      d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
    />
    <path
      fill="none"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="32"
      d="M338.29 338.29L448 448"
    />
  </svg>
);

export default SearchIcon;
