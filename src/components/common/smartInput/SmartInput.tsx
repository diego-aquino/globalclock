import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import {
  Container,
  StyledInput,
  SuggestionsContainer,
  LoadingSuggestionsSign,
} from 'styles/components/common/smartInput/SmartInput';
import {
  SmartInputKeydownActions,
  SuggestionEventHandler,
  SuggestionEventHandlers,
  SuggestionGroup,
  SuggestionIdentifier,
  SuggestionSelectHandler,
} from './types';
import SuggestionGroupComponent from './SuggestionGroup';
import { useSuggestionHighlight } from './useSuggestionHighlight';
import { InputComponentProps } from '../Input';

type Props = InputComponentProps & {
  suggestionGroups?: SuggestionGroup[];
  loading?: boolean;
  onSuggestionSelect?: SuggestionSelectHandler;
};

const SmartInput: FC<Props> = ({
  suggestionGroups = [],
  loading = false,
  onSuggestionSelect,
  ...rest
}) => {
  const [showSuggestionsContainer, setShowSuggestionsContainer] = useState(
    false,
  );
  const {
    highlightedSuggestion,
    highlight,
    highlightAbove,
    highlightBelow,
    removeHighlight,
    isHighlighted,
  } = useSuggestionHighlight(suggestionGroups);

  const handleSuggestionSelect = useCallback(
    (suggestion: SuggestionIdentifier) => {
      if (isHighlighted(suggestion)) {
        onSuggestionSelect?.(suggestion);
      }
    },
    [onSuggestionSelect, isHighlighted],
  );

  const handleSuggestionHighlight = useCallback<SuggestionEventHandler>(
    (groupIndex, suggestionIndex) => {
      const suggestion = { groupIndex, suggestionIndex };

      if (!isHighlighted(suggestion)) {
        highlight(suggestion);
      }
    },
    [highlight, isHighlighted],
  );

  const handleSuggestionClick = useCallback<SuggestionEventHandler>(
    (groupIndex, suggestionIndex) => {
      const suggestion = { groupIndex, suggestionIndex };
      handleSuggestionSelect(suggestion);
    },
    [handleSuggestionSelect],
  );

  const suggestionEventHandlers = useMemo<SuggestionEventHandlers>(
    () => ({
      mouseEnter: handleSuggestionHighlight,
      focus: handleSuggestionHighlight,
      click: handleSuggestionClick,
    }),
    [handleSuggestionHighlight, handleSuggestionClick],
  );

  const renderSuggestionGroups = useCallback(
    () =>
      suggestionGroups.map(({ key, label, suggestions }, groupIndex) => {
        const hasNoSuggestions = suggestions.length === 0;
        if (hasNoSuggestions) return null;

        const isHighlightedSuggestionInThisGroup =
          groupIndex === highlightedSuggestion.groupIndex;

        const highlightedSuggestionIndex = isHighlightedSuggestionInThisGroup
          ? highlightedSuggestion.suggestionIndex
          : -1;

        return (
          <SuggestionGroupComponent
            key={key}
            label={label}
            suggestions={suggestions}
            groupIndex={groupIndex}
            highlightedSuggestionIndex={highlightedSuggestionIndex}
            onSuggestion={suggestionEventHandlers}
          />
        );
      }),
    [suggestionGroups, highlightedSuggestion, suggestionEventHandlers],
  );

  useEffect(() => {
    const atLeastOneGroupHasSuggestions = () =>
      !!suggestionGroups?.some((group) => group.suggestions.length > 0);

    const shouldShowSuggestionsContainer =
      loading || atLeastOneGroupHasSuggestions();

    setShowSuggestionsContainer(shouldShowSuggestionsContainer);
  }, [suggestionGroups, loading]);

  useEffect(() => {
    const setupKeydownActions = () => {
      const keydownActions: SmartInputKeydownActions = {
        Enter: () => handleSuggestionSelect(highlightedSuggestion),
        ArrowUp: () => highlightAbove(highlightedSuggestion),
        ArrowDown: () => highlightBelow(highlightedSuggestion),
        Escape: () => removeHighlight(),
      };

      const handleKeydown = (event: KeyboardEvent) => {
        const handlerFunction = keydownActions[event.key];
        handlerFunction?.(event);
      };

      window.addEventListener('keydown', handleKeydown);

      return () => window.removeEventListener('keydown', handleKeydown);
    };

    return setupKeydownActions();
  }, [
    handleSuggestionSelect,
    highlightedSuggestion,
    highlightAbove,
    highlightBelow,
    removeHighlight,
  ]);

  return (
    <Container hasActiveSuggestions={showSuggestionsContainer}>
      <StyledInput hasActiveSuggestions={showSuggestionsContainer} {...rest} />
      {showSuggestionsContainer && (
        <SuggestionsContainer>
          {loading ? (
            <LoadingSuggestionsSign styleMode="primary" />
          ) : (
            renderSuggestionGroups()
          )}
        </SuggestionsContainer>
      )}
    </Container>
  );
};

export default SmartInput;
