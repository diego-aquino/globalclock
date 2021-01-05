import { FC } from 'react';

import { SVGElementProps } from 'typings';

const MapMarkerIcon: FC<SVGElementProps> = (props) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);

export default MapMarkerIcon;
