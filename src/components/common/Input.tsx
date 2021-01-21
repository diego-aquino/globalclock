import React, {
  FC,
  useCallback,
  useRef,
  InputHTMLAttributes,
  ReactElement,
  useState,
  ChangeEvent,
} from 'react';

import { XIcon } from 'assets';
import {
  Container,
  IconWrapper,
  StyledInput,
  ClearEntriesButton,
} from 'styles/components/common/Input';

export interface InputComponentProps
  extends InputHTMLAttributes<HTMLInputElement> {
  icon?: HTMLElement | ReactElement;
  clearButtonEnabled?: boolean;
}

const Input: FC<InputComponentProps> = ({
  icon,
  clearButtonEnabled = false,
  onChange,
  ...rest
}) => {
  const [showClearButton, setShowClearButton] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const shouldShowClearButton =
        clearButtonEnabled && event.target.value.length > 0;

      if (showClearButton !== shouldShowClearButton) {
        setShowClearButton(shouldShowClearButton);
      }

      onChange?.(event);
    },
    [clearButtonEnabled, onChange, showClearButton],
  );

  const clearInputValue = useCallback(() => {
    if (!inputRef.current) return;

    inputRef.current.value = '';
    focusInput();
    handleInputChange({
      target: inputRef.current,
    } as ChangeEvent<HTMLInputElement>);
  }, [focusInput, handleInputChange]);

  return (
    <Container>
      {icon && <IconWrapper onClick={focusInput}>{icon}</IconWrapper>}
      <StyledInput
        ref={inputRef}
        hasIcon={!!icon}
        isClearButtonShown={showClearButton}
        onChange={handleInputChange}
        {...rest}
      />
      {showClearButton && (
        <ClearEntriesButton onClick={clearInputValue}>
          <XIcon />
        </ClearEntriesButton>
      )}
    </Container>
  );
};

export default Input;
