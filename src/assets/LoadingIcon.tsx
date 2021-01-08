import { FC } from 'react';

import { SVGElementProps } from 'typings';
import { Container, LoadingIconStyleMode } from 'styles/assets/LoadingIcon';

interface Props extends SVGElementProps {
  styleMode: LoadingIconStyleMode;
}

const LoadingIcon: FC<Props> = ({ styleMode, ...rest }) => (
  <Container
    styleMode={styleMode}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path d="M19.2969 10.7031C18.9082 10.7031 18.5938 10.3887 18.5938 10C18.5938 8.83984 18.3672 7.71484 17.918 6.6543C17.4858 5.63332 16.8604 4.70549 16.0762 3.92188C15.2934 3.13656 14.3654 2.51101 13.3438 2.08008C12.2852 1.63281 11.1602 1.40625 10 1.40625C9.61133 1.40625 9.29688 1.0918 9.29688 0.703125C9.29688 0.314453 9.61133 0 10 0C11.3496 0 12.6602 0.263672 13.8926 0.787109C15.084 1.28906 16.1523 2.01172 17.0703 2.92969C17.9883 3.84766 18.709 4.91797 19.2129 6.10742C19.7344 7.33984 19.998 8.65039 19.998 10C20 10.3887 19.6855 10.7031 19.2969 10.7031Z" />
  </Container>
);

export default LoadingIcon;
