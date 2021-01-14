import React, { ButtonHTMLAttributes, FC } from 'react';

import { RemoveFrom } from 'typings';
import ActiveElement, { PartialActiveElementProps } from './ActiveElement';

type Props = RemoveFrom<PartialActiveElementProps, 'as'> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({
  styleMode,
  showLabel,
  icon,
  loading,
  children,
  ...rest
}) => (
  <ActiveElement
    as="button"
    styleMode={styleMode}
    showLabel={showLabel}
    icon={icon}
    loading={loading}
    {...rest}
  >
    {children}
  </ActiveElement>
);

export default Button;
