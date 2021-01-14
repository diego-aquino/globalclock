import React, {
  ReactElement,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react';
import { LoadingIconStyleMode } from 'styles/assets/LoadingIcon';

import {
  Container,
  ActiveElementStyleMode,
  StyledLoadingIcon,
  PrimaryWrapper,
  IconWrapper,
  ChildrenWrapper,
} from 'styles/components/common/ActiveElement';

const loadingIconStyleModes: {
  [key in ActiveElementStyleMode]: LoadingIconStyleMode;
} = {
  primary: 'secondaryWhite',
};

export interface PartialActiveElementProps {
  as: 'button' | 'a';
  styleMode: ActiveElementStyleMode;
  showLabel?: boolean;
  icon?: HTMLElement | ReactElement;
  loading?: boolean;
}

type ActiveElementProps = PartialActiveElementProps &
  (
    | AnchorHTMLAttributes<HTMLAnchorElement>
    | ButtonHTMLAttributes<HTMLButtonElement>
  );

const ActiveElement: ForwardRefRenderFunction<
  HTMLAnchorElement,
  ActiveElementProps
> = (
  { as, styleMode, showLabel = true, icon, loading, children, ...rest },
  ref,
) => (
  <Container
    ref={ref}
    as={as}
    styleMode={styleMode}
    $loading={loading}
    {...rest}
  >
    {loading && (
      <StyledLoadingIcon styleMode={loadingIconStyleModes[styleMode]} />
    )}

    <PrimaryWrapper $hidden={loading}>
      <IconWrapper hasIcon={!!icon} isFollowedByLabel={showLabel && !!children}>
        {icon}
      </IconWrapper>
      <ChildrenWrapper showLabel={showLabel}>{children}</ChildrenWrapper>
    </PrimaryWrapper>
  </Container>
);

export default forwardRef(ActiveElement);
