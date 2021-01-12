import React, { FC, HTMLAttributes, ReactElement, useCallback } from 'react';

import { Container } from 'styles/components/common/smartInput/SuggestionGroup';
import Suggestion from './Suggestion';

interface SuggestionDetails {
  key: string;
  title: string;
  icon?: HTMLElement | ReactElement;
  subtitle?: string;
}

export type SuggestionEventHandler = (
  groupIndex: number,
  suggestionIndex: number,
) => void;

export interface SuggestionEventHandlers {
  mouseEnter?: SuggestionEventHandler;
  focus?: SuggestionEventHandler;
  click?: SuggestionEventHandler;
}

type Props = HTMLAttributes<HTMLDivElement> & {
  label: string;
  suggestions: SuggestionDetails[];
  groupIndex: number;
  highlightedSuggestionIndex?: number;
  onSuggestion?: SuggestionEventHandlers;
};

const SuggestionGroup: FC<Props> = ({
  label,
  suggestions,
  groupIndex,
  highlightedSuggestionIndex = -1,
  onSuggestion,
  ...rest
}) => {
  const renderSuggestions = useCallback(() => {
    const handleSuggestionEvent = (
      eventType: keyof SuggestionEventHandlers,
      suggestionIndex: number,
    ) => {
      onSuggestion?.[eventType]?.(groupIndex, suggestionIndex);
    };

    return suggestions.map(
      ({ key, icon, title, subtitle }, suggestionIndex) => {
        const highlighted = suggestionIndex === highlightedSuggestionIndex;

        return (
          <Suggestion
            key={key}
            icon={icon}
            title={title}
            subtitle={subtitle}
            highlighted={highlighted}
            onMouseEnter={() =>
              handleSuggestionEvent('mouseEnter', suggestionIndex)
            }
            onFocus={() => handleSuggestionEvent('focus', suggestionIndex)}
            onClick={() => handleSuggestionEvent('click', suggestionIndex)}
          />
        );
      },
    );
  }, [suggestions, highlightedSuggestionIndex, onSuggestion, groupIndex]);

  return (
    <Container {...rest}>
      <p>{label}</p>
      <div>{renderSuggestions()}</div>
    </Container>
  );
};

export default SuggestionGroup;
