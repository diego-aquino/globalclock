import React, { FC, HTMLAttributes, useCallback } from 'react';

import { Container } from 'styles/components/common/smartInput/SuggestionGroup';
import Suggestion from './Suggestion';
import { SuggestionDetails, SuggestionEventHandlers } from './types';

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
  const handleSuggestionEvent = useCallback(
    (eventType: keyof SuggestionEventHandlers, suggestionIndex: number) => {
      onSuggestion?.[eventType]?.(groupIndex, suggestionIndex);
    },
    [groupIndex, onSuggestion],
  );

  const renderSuggestions = useCallback(
    () =>
      suggestions.map(({ key, ...details }, suggestionIndex) => {
        const highlighted = suggestionIndex === highlightedSuggestionIndex;

        return (
          <Suggestion
            key={key}
            {...details}
            highlighted={highlighted}
            onMouseEnter={() =>
              handleSuggestionEvent('mouseEnter', suggestionIndex)
            }
            onFocus={() => handleSuggestionEvent('focus', suggestionIndex)}
            onClick={() => handleSuggestionEvent('click', suggestionIndex)}
          />
        );
      }),
    [suggestions, highlightedSuggestionIndex, handleSuggestionEvent],
  );

  return (
    <Container {...rest}>
      <p>{label}</p>
      <div>{renderSuggestions()}</div>
    </Container>
  );
};

export default SuggestionGroup;
