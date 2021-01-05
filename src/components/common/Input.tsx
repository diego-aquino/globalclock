import React, {
  FC,
  useCallback,
  useRef,
  InputHTMLAttributes,
  ReactElement,
} from 'react';

import {
  Container,
  IconWrapper,
  StyledInput,
} from 'styles/components/common/Input';

export interface InputComponentProps
  extends InputHTMLAttributes<HTMLInputElement> {
  icon?: HTMLElement | ReactElement;
}

const Input: FC<InputComponentProps> = ({ icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInputElement = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Container>
      {icon && <IconWrapper onClick={focusInputElement}>{icon}</IconWrapper>}
      <StyledInput ref={inputRef} hasIcon={!!icon} {...rest} />
    </Container>
  );
};

export default Input;
