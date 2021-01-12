import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import {
  Container,
  StyledInput,
  SuggestionsContainer,
} from 'styles/components/common/smartInput/SmartInput';
import {
  SmartInputKeydownActions,
  SuggestionGroup,
  SuggestionIdentifier,
  SuggestionSelectHandler,
} from './types';
import SuggestionGroupComponent, {
  SuggestionEventHandler,
  SuggestionEventHandlers,
} from './SuggestionGroup';
import { useSuggestionHighlight } from './useSuggestionHighlight';
import { InputComponentProps } from '../Input';

type Props = InputComponentProps & {
  suggestionGroups?: SuggestionGroup[];
  onSuggestionSelect?: SuggestionSelectHandler;
};

const SmartInput: FC<Props> = ({
  suggestionGroups = [],
  onSuggestionSelect,
  ...rest
}) => {
  const suggestionResources = useSuggestionHighlight(suggestionGroups);
  const [shouldShowSuggestions, setShouldShowSuggestions] = useState(false);

  useEffect(() => {
    const atLeastOneGroupHasSuggestions = !!suggestionGroups?.some(
      (group) => group.suggestions.length > 0,
    );

    setShouldShowSuggestions(atLeastOneGroupHasSuggestions);
  }, [suggestionGroups]);

  const handleSuggestionSelect = useCallback(
    (suggestion: SuggestionIdentifier) => {
      const isValidSuggestion =
        suggestion.groupIndex !== -1 && suggestion.suggestionIndex !== -1;

      if (isValidSuggestion) {
        onSuggestionSelect?.(suggestion);
      }
    },
    [onSuggestionSelect],
  );

  const suggestionEventHandlers = useMemo<SuggestionEventHandlers>(() => {
    const { isHighlighted, highlight } = suggestionResources;

    const handleHighlight: SuggestionEventHandler = (
      groupIndex,
      suggestionIndex,
    ) => {
      const suggestion = { groupIndex, suggestionIndex };

      if (!isHighlighted(suggestion)) {
        highlight(suggestion);
      }
    };

    const handleClick: SuggestionEventHandler = (
      groupIndex,
      suggestionIndex,
    ) => {
      const suggestion = { groupIndex, suggestionIndex };

      if (isHighlighted(suggestion)) {
        handleSuggestionSelect(suggestion);
      }
    };

    return {
      mouseEnter: handleHighlight,
      focus: handleHighlight,
      click: handleClick,
    };
  }, [suggestionResources, handleSuggestionSelect]);

  const renderSuggestionGroups = useCallback(
    () =>
      suggestionGroups.map(({ key, label, suggestions }, groupIndex) => {
        const hasNoSuggestions = suggestions.length === 0;
        if (hasNoSuggestions) return null;

        const { highlightedSuggestion } = suggestionResources;

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
    [suggestionResources, suggestionEventHandlers, suggestionGroups],
  );

  useEffect(() => {
    const { highlightedSuggestion } = suggestionResources;

    const keydownActions: SmartInputKeydownActions = {
      Enter: () => handleSuggestionSelect(highlightedSuggestion),
      ArrowUp: () => suggestionResources.highlightAbove(highlightedSuggestion),
      ArrowDown: () =>
        suggestionResources.highlightBelow(highlightedSuggestion),
      Escape: suggestionResources.removeHighlight,
    };

    const handleKeydown = (event: KeyboardEvent) => {
      const handlerFunction = keydownActions[event.key];
      handlerFunction?.(event);
    };

    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [suggestionResources, handleSuggestionSelect]);

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
