import React, { ButtonHTMLAttributes, FC, ReactElement } from 'react';

import {
  Container,
  ChildrenWrapper,
  ButtonStyleMode,
  IconWrapper,
} from 'styles/components/common/Button';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleMode: ButtonStyleMode;
  icon?: HTMLElement | ReactElement;
}

const Button: FC<Props> = ({ icon, styleMode, children, ...rest }) => (
  <Container styleMode={styleMode} {...rest}>
    <IconWrapper hasIcon={!!icon}>{icon}</IconWrapper>
    <ChildrenWrapper>{children}</ChildrenWrapper>
  </Container>
);

export default Button;
