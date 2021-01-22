import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { useConstrainedHeightRef } from 'hooks';
import {
  Container,
  StyledInput,
  SuggestionsContainer,
  LoadingSuggestionsSign,
} from 'styles/components/common/smartInput/SmartInput';
import { isIntoView } from 'utils/general';
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

  const suggestionsContainerRef = useConstrainedHeightRef<HTMLDivElement>(
    null,
    [suggestionGroups],
  );

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

  const scrollSuggestionToViewIfNecessary = useCallback(
    (suggestion: SuggestionIdentifier) => {
      const suggestionsContainer = suggestionsContainerRef.current;
      if (!suggestionsContainer) return;

      const { groupIndex, suggestionIndex } = suggestion;

      const getHighlightedSuggestionElement = () => {
        const suggestionsContainerSelector = Array.from(
          suggestionsContainer.classList,
        )
          .map((className) => `.${className}`)
          .join('');

        const highlightedGroupElement = document.querySelector(
          `${suggestionsContainerSelector} > div:nth-child(${groupIndex + 1})`,
        );
        const highlightedSuggestionElement =
          highlightedGroupElement?.querySelector(
            `button:nth-child(${suggestionIndex + 1})`,
          ) ?? null;

        return highlightedSuggestionElement;
      };

      const getContainerViewLimits = () => {
        const containerClientRect = suggestionsContainer.getBoundingClientRect();

        const containerComputedStyle = window.getComputedStyle(
          suggestionsContainer,
        );
        const containerPadding = ['top', 'left', 'bottom', 'right'].reduce(
          (accumulated, direction) => ({
            ...accumulated,
            [direction]: parseInt(
              containerComputedStyle.getPropertyValue(`padding-${direction}`),
            ),
          }),
          { top: 0, left: 0, bottom: 0, right: 0 },
        );

        return {
          top: containerClientRect.top + containerPadding.top,
          left: containerClientRect.left + containerPadding.left,
          bottom: containerClientRect.bottom + containerPadding.bottom,
          right: containerClientRect.right + containerPadding.right,
        };
      };

      const highlightedSuggestionElement = getHighlightedSuggestionElement();

      const shouldScrollIntoView =
        highlightedSuggestionElement &&
        !isIntoView(highlightedSuggestionElement, {
          viewLimits: getContainerViewLimits(),
        });

      if (shouldScrollIntoView) {
        highlightedSuggestionElement?.scrollIntoView();
      }
    },
    [suggestionsContainerRef],
  );

  useEffect(() => {
    scrollSuggestionToViewIfNecessary(highlightedSuggestion);
  }, [highlightedSuggestion, scrollSuggestionToViewIfNecessary]);

  useEffect(() => {
    const atLeastOneGroupHasSuggestions = () =>
      !!suggestionGroups?.some((group) => group.suggestions.length > 0);

    const shouldShowSuggestionsContainer =
      loading || atLeastOneGroupHasSuggestions();

    setShowSuggestionsContainer(shouldShowSuggestionsContainer);
  }, [suggestionGroups, loading]);

  useEffect(() => {
    if (loading && suggestionsContainerRef.current) {
      suggestionsContainerRef.current.style.height = '';
    }
  }, [loading, suggestionsContainerRef]);

  useEffect(() => {
    if (loading || suggestionGroups.length === 0) {
      removeHighlight();
    }
  }, [loading, suggestionGroups, removeHighlight]);

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
        <SuggestionsContainer ref={suggestionsContainerRef}>
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
