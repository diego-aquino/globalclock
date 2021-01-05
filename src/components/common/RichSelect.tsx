import React, {
  FC,
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState,
  ReactElement,
} from 'react';

import { Merge } from 'typings';
import {
  Container,
  Option as OptionComponent,
  SelectedOption,
  StyledArrowIcon,
  CollapsibleOptionsContainer,
  Separator,
} from 'styles/components/common/RichSelect';

export type LocationMode = 'city' | 'userLocation';

export interface Option {
  label: string;
  icon?: HTMLElement | ReactElement;
  value?: any;
}

interface PartialProps {
  options: Option[];
  onChange?(newSelectedOption: Option): void;
}

type Props = Merge<HTMLAttributes<HTMLDivElement>, PartialProps>;

const RichSelect: FC<Props> = ({ options, onChange, ...rest }) => {
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const [areOptionsOpen, setAreOptionsOpen] = useState(false);

  const closeOptions = useCallback(() => setAreOptionsOpen(false), []);
  const toggleOpenOptions = useCallback(
    () => setAreOptionsOpen((previousOpenStatus) => !previousOpenStatus),
    [],
  );

  const handleSelectOptionClick = useCallback(
    (newSelectedOption: Option) => {
      setSelectedOption(newSelectedOption);
      onChange?.(newSelectedOption);
      closeOptions();
    },
    [onChange, closeOptions],
  );

  const renderedOptions = useMemo(
    () =>
      options.map((option, index) => {
        const isLastOption = index === options.length - 1;

        return (
          <OptionComponent
            key={option.label}
            onClick={() => handleSelectOptionClick(option)}
            isPrecededByOption
            isFollowedByOption={!isLastOption}
            isSelected={option === selectedOption}
          >
            {option.icon}
            {option.label}
          </OptionComponent>
        );
      }),
    [options, selectedOption, handleSelectOptionClick],
  );

  useEffect(() => {
    function closeSelectOptionsOnEscape({ key }: KeyboardEvent) {
      if (key === 'Escape' && areOptionsOpen) {
        setAreOptionsOpen(false);
      }
    }

    window.addEventListener('keydown', closeSelectOptionsOnEscape);

    return () =>
      window.removeEventListener('keydown', closeSelectOptionsOnEscape);
  }, [areOptionsOpen]);

  return (
    <Container isFocused={areOptionsOpen} {...rest}>
      <SelectedOption
        onClick={toggleOpenOptions}
        isFollowedByOption={areOptionsOpen}
      >
        <div>
          {selectedOption?.icon}
          {selectedOption?.label}
        </div>
        <StyledArrowIcon direction={areOptionsOpen ? 'up' : 'down'} />
      </SelectedOption>

      <CollapsibleOptionsContainer isOpen={areOptionsOpen}>
        <Separator />
        {renderedOptions}
      </CollapsibleOptionsContainer>
    </Container>
  );
};

export default RichSelect;
