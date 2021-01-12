import React, { FC, useCallback, useEffect, useMemo } from 'react';

import {
  Container,
  StyledInput,
  SuggestionsContainer,
} from 'styles/components/common/smartInput/SmartInput';
import {
  SmartInputKeydownActions,
  SuggestionGroup,
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

  const shouldShowSuggestions = useMemo(() => {
    const atLeastOneGroupHasSuggestions = !!suggestionGroups?.some(
      (group) => group.suggestions.length > 0,
    );

    return atLeastOneGroupHasSuggestions;
  }, [suggestionGroups]);

  const handleSuggestionSelect = useCallback(() => {
    const {
      groupIndex,
      suggestionIndex,
    } = suggestionResources.highlightedSuggestion;

    onSuggestionSelect?.({ groupIndex, suggestionIndex });
  }, [onSuggestionSelect, suggestionResources.highlightedSuggestion]);

  const suggestionEventHandlers = useMemo<SuggestionEventHandlers>(() => {
    const isHighlightedSuggestion = (
      groupIndex: number,
      suggestionIndex: number,
    ) => {
      const { highlightedSuggestion } = suggestionResources;

      return (
        highlightedSuggestion.groupIndex === groupIndex &&
        highlightedSuggestion.suggestionIndex === suggestionIndex
      );
    };

    const handleHighlight: SuggestionEventHandler = (
      groupIndex,
      suggestionIndex,
    ) => {
      if (!isHighlightedSuggestion(groupIndex, suggestionIndex)) {
        suggestionResources.highlight({ groupIndex, suggestionIndex });
      }
    };

    const handleClick: SuggestionEventHandler = (
      groupIndex,
      suggestionIndex,
    ) => {
      if (isHighlightedSuggestion(groupIndex, suggestionIndex)) {
        handleSuggestionSelect();
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
      Enter: handleSuggestionSelect,
      ArrowUp: () => suggestionResources.highlightAbove(highlightedSuggestion),
      ArrowDown: () =>
        suggestionResources.highlightBelow(highlightedSuggestion),
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
      <SuggestionsContainer>{renderSuggestionGroups()}</SuggestionsContainer>
      <StyledInput hasActiveSuggestions={shouldShowSuggestions} {...rest} />
    </Container>
  );
};

export default SmartInput;
