import React, { AnchorHTMLAttributes, FC } from 'react';
import NextLink from 'next/link';
import { UrlObject } from 'url';

import { RemoveFrom } from 'typings';
import ActiveElement, { PartialActiveElementProps } from './ActiveElement';

type Props = RemoveFrom<PartialActiveElementProps, 'as'> &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string | UrlObject;
  };

const Link: FC<Props> = ({
  href,
  styleMode,
  icon,
  loading,
  children,
  ...rest
}) => (
  <NextLink href={href} passHref>
    <ActiveElement
      as="a"
      styleMode={styleMode}
      icon={icon}
      loading={loading}
      {...rest}
    >
      {children}
    </ActiveElement>
  </NextLink>
);

export default Link;
