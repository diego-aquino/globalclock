import React, { ButtonHTMLAttributes, FC, ReactElement } from 'react';

import {
  Container,
  ChildrenWrapper,
  ButtonStyleMode,
  IconWrapper,
  PrimaryWrapper,
  StyledLoadingIcon,
} from 'styles/components/common/Button';
import { LoadingIconStyleMode } from 'styles/assets/LoadingIcon';

const loadingIconStyleModes: {
  [key in ButtonStyleMode]: LoadingIconStyleMode;
} = {
  primary: 'secondaryWhite',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleMode: ButtonStyleMode;
  icon?: HTMLElement | ReactElement;
  loading?: boolean;
}

const Button: FC<Props> = ({ styleMode, icon, loading, children, ...rest }) => (
  <Container styleMode={styleMode} {...rest}>
    {loading && (
      <StyledLoadingIcon styleMode={loadingIconStyleModes[styleMode]} />
    )}

    <PrimaryWrapper $hidden={loading}>
      <IconWrapper hasIcon={!!icon}>{icon}</IconWrapper>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </PrimaryWrapper>
  </Container>
);

export default Button;
