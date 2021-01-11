import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Container,
  StyledInput,
  SuggestionsContainer,
  SuggestionGroupContainer,
} from 'styles/components/common/smartInput/SmartInput';

import { InputComponentProps } from '../Input';
import Suggestion from './Suggestion';

interface HighlightedSuggestions {
  groupIndex: number | null;
  suggestionIndex: number | null;
}

interface SuggestionSelectEvent {
  groupIndex: number;
  suggestionIndex: number;
}

export type OnSuggestionSelectHandler = (event: SuggestionSelectEvent) => void;

export interface Suggestion {
  key: string;
  title: string;
  icon?: HTMLElement | ReactElement;
  subtitle?: string;
}

interface SuggestionGroup {
  key: string;
  label: string;
  suggestions: Suggestion[];
}

type Props = InputComponentProps & {
  suggestionGroups?: SuggestionGroup[];
  onSuggestionSelect?: OnSuggestionSelectHandler;
};

const SmartInput: FC<Props> = ({
  suggestionGroups,
  onSuggestionSelect,
  ...rest
}) => {
  const [
    highlightedSuggestion,
    setHighlightedSuggestion,
  ] = useState<HighlightedSuggestions>({
    groupIndex: null,
    suggestionIndex: null,
  });

  const shouldShowSuggestions = useMemo(() => {
    const atLeastOneGroupHasSuggestions = !!suggestionGroups?.some(
      (group) => group.suggestions.length > 0,
    );

    return atLeastOneGroupHasSuggestions;
  }, [suggestionGroups]);

  const highlightSuggestion = useCallback(
    (groupIndex: number | null, suggestionIndex: number | null) => {
      setHighlightedSuggestion({ groupIndex, suggestionIndex });
    },
    [],
  );

  const handleSuggestionSelect = useCallback(() => {
    const { groupIndex, suggestionIndex } = highlightedSuggestion;

    if (groupIndex !== null && suggestionIndex !== null) {
      onSuggestionSelect?.({ groupIndex, suggestionIndex });
    }
  }, [highlightedSuggestion, onSuggestionSelect]);

  const renderSuggestions = useCallback(
    (suggestions: Suggestion[], groupIndex: number) =>
      suggestions.map(({ key, icon, title, subtitle }, suggestionIndex) => {
        const highlighted =
          groupIndex === highlightedSuggestion.groupIndex &&
          suggestionIndex === highlightedSuggestion.suggestionIndex;

        const highlightSelf = () =>
          highlightSuggestion(groupIndex, suggestionIndex);

        const handleHighlight = () => {
          if (!highlighted) highlightSelf();
        };

        const handleClick = () => {
          if (highlighted) handleSuggestionSelect();
        };

        return (
          <Suggestion
            key={key}
            icon={icon}
            title={title}
            subtitle={subtitle}
            highlighted={highlighted}
            onMouseEnter={handleHighlight}
            onFocus={handleHighlight}
            onClick={handleClick}
          />
        );
      }),
    [highlightedSuggestion, highlightSuggestion, handleSuggestionSelect],
  );

  const renderSuggestionGroups = useCallback(
    (groups: SuggestionGroup[]) =>
      groups.map(({ key, label, suggestions }, groupIndex) => {
        const hasNoSuggestions = suggestions.length === 0;
        if (hasNoSuggestions) return null;

        return (
          <SuggestionGroupContainer key={key}>
            <p>{label}</p>
            <div>{renderSuggestions(suggestions, groupIndex)}</div>
          </SuggestionGroupContainer>
        );
      }),
    [renderSuggestions],
  );

  useEffect(() => {
    const keydownActions: { [key: string]: (event: KeyboardEvent) => void } = {
      Enter: handleSuggestionSelect,
    };

    const handleKeydown = (event: KeyboardEvent) => {
      const handlerFunction = keydownActions[event.key];
      handlerFunction?.(event);
    };

    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [handleSuggestionSelect]);

  return (
    <Container hasActiveSuggestions={shouldShowSuggestions}>
      {suggestionGroups && shouldShowSuggestions && (
        <SuggestionsContainer>
          {renderSuggestionGroups(suggestionGroups)}
        </SuggestionsContainer>
      )}

      <StyledInput hasActiveSuggestions={shouldShowSuggestions} {...rest} />
    </Container>
  );
};

export default SmartInput;
