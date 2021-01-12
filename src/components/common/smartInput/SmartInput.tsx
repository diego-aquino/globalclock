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
} from 'styles/components/common/smartInput/SmartInput';
import { InputComponentProps } from '../Input';
import SuggestionGroup, {
  SuggestionEventHandler,
  SuggestionEventHandlers,
} from './SuggestionGroup';

interface ActiveHighlightedSuggestion {
  groupIndex: number;
  suggestionIndex: number;
}

type InactiveHighlightedSuggestion = {
  [key in keyof ActiveHighlightedSuggestion]: -1;
};

type HighlightedSuggestion =
  | ActiveHighlightedSuggestion
  | InactiveHighlightedSuggestion;

interface SuggestionSelectEvent {
  groupIndex: number;
  suggestionIndex: number;
}

export type OnSuggestionSelectHandler = (event: SuggestionSelectEvent) => void;

export interface SuggestionDetails {
  key: string;
  title: string;
  icon?: HTMLElement | ReactElement;
  subtitle?: string;
}

interface SuggestionGroup {
  key: string;
  label: string;
  suggestions: SuggestionDetails[];
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
  ] = useState<HighlightedSuggestion>({
    groupIndex: -1,
    suggestionIndex: -1,
  });

  const shouldShowSuggestions = useMemo(() => {
    const atLeastOneGroupHasSuggestions = !!suggestionGroups?.some(
      (group) => group.suggestions.length > 0,
    );

    return atLeastOneGroupHasSuggestions;
  }, [suggestionGroups]);

  const highlightSuggestion = useCallback(
    (suggestionToHighlight: HighlightedSuggestion) => {
      setHighlightedSuggestion(suggestionToHighlight);
    },
    [],
  );

  const handleSuggestionSelect = useCallback(() => {
    const { groupIndex, suggestionIndex } = highlightedSuggestion;

    if (groupIndex !== null && suggestionIndex !== null) {
      onSuggestionSelect?.({ groupIndex, suggestionIndex });
    }
  }, [highlightedSuggestion, onSuggestionSelect]);

  const isSuggestionHighlighted = useCallback(
    (groupIndex: number, suggestionIndex: number) =>
      highlightedSuggestion.groupIndex === groupIndex &&
      highlightedSuggestion.suggestionIndex === suggestionIndex,
    [highlightedSuggestion],
  );

  const suggestionEventHandlers = useMemo((): SuggestionEventHandlers => {
    const handleHighlight: SuggestionEventHandler = (
      groupIndex,
      suggestionIndex,
    ) => {
      if (!isSuggestionHighlighted(groupIndex, suggestionIndex)) {
        highlightSuggestion({ groupIndex, suggestionIndex });
      }
    };

    const handleClick: SuggestionEventHandler = (
      groupIndex,
      suggestionIndex,
    ) => {
      if (isSuggestionHighlighted(groupIndex, suggestionIndex)) {
        handleSuggestionSelect();
      }
    };

    return {
      mouseEnter: handleHighlight,
      focus: handleHighlight,
      click: handleClick,
    };
  }, [handleSuggestionSelect, highlightSuggestion, isSuggestionHighlighted]);

  const renderSuggestionGroups = useCallback(() => {
    if (!suggestionGroups) return null;

    return suggestionGroups.map(({ key, label, suggestions }, groupIndex) => {
      const hasNoSuggestions = suggestions.length === 0;
      if (hasNoSuggestions) return null;

      const isHighlightedSuggestionInGroup =
        groupIndex === highlightedSuggestion.groupIndex;

      const highlightedSuggestionIndex = isHighlightedSuggestionInGroup
        ? highlightedSuggestion.suggestionIndex
        : -1;

      return (
        <SuggestionGroup
          key={key}
          label={label}
          suggestions={suggestions}
          groupIndex={groupIndex}
          highlightedSuggestionIndex={highlightedSuggestionIndex}
          onSuggestion={suggestionEventHandlers}
        />
      );
    });
  }, [highlightedSuggestion, suggestionEventHandlers, suggestionGroups]);

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
      {shouldShowSuggestions && (
        <SuggestionsContainer>{renderSuggestionGroups()}</SuggestionsContainer>
      )}

      <StyledInput hasActiveSuggestions={shouldShowSuggestions} {...rest} />
    </Container>
  );
};

export default SmartInput;
