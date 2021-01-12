import { useCallback, useMemo, useState } from 'react';

import {
  GlobalSuggestionIdentifier,
  SuggestionGroup,
  SuggestionIdentifier,
} from './types';

interface SuggestionHighlightResources {
  highlightedSuggestion: GlobalSuggestionIdentifier;
  highlight: (suggestion: SuggestionIdentifier) => void;
  highlightAbove: (baseSuggestion: GlobalSuggestionIdentifier) => void;
  highlightBelow: (baseSuggestion: GlobalSuggestionIdentifier) => void;
  removeHighlight: () => void;
  isHighlighted: (suggestion: SuggestionIdentifier) => boolean;
}

export function useSuggestionHighlight(
  suggestionGroups: SuggestionGroup[],
): SuggestionHighlightResources {
  const [
    highlightedSuggestion,
    setHighlightedSuggestion,
  ] = useState<GlobalSuggestionIdentifier>({
    groupIndex: -1,
    suggestionIndex: -1,
    globalIndex: -1,
  });

  const totalNumberOfSuggestions = useMemo(
    () =>
      suggestionGroups.reduce(
        (accumulatedNumberOfSuggestions, currentGroup) =>
          accumulatedNumberOfSuggestions + currentGroup.suggestions.length,
        0,
      ),
    [suggestionGroups],
  );

  const generateGlobalIndex = useCallback(
    (suggestion: SuggestionIdentifier) => {
      let numberOfSuggestionsInPreviousGroups = 0;

      for (
        let groupIndex = 0;
        groupIndex < suggestion.groupIndex;
        groupIndex++
      ) {
        const group = suggestionGroups[groupIndex];
        const numberOfSuggestionsInGroup = group.suggestions.length;

        numberOfSuggestionsInPreviousGroups += numberOfSuggestionsInGroup;
      }

      const globalIndex =
        numberOfSuggestionsInPreviousGroups + suggestion.suggestionIndex;

      return globalIndex;
    },
    [suggestionGroups],
  );

  const generateRealSuggestionIndexes = useCallback(
    (globalIndex: number): SuggestionIdentifier => {
      let numberOfSuggestionsLeft = globalIndex + 1;

      for (
        let groupIndex = 0;
        groupIndex < suggestionGroups.length;
        groupIndex++
      ) {
        const group = suggestionGroups[groupIndex];
        const numberOfSuggestionsInGroup = group.suggestions.length;

        if (numberOfSuggestionsLeft - numberOfSuggestionsInGroup <= 0) {
          return { groupIndex, suggestionIndex: numberOfSuggestionsLeft - 1 };
        }

        numberOfSuggestionsLeft -= numberOfSuggestionsInGroup;
      }

      return { groupIndex: -1, suggestionIndex: -1 };
    },
    [suggestionGroups],
  );

  const highlight = useCallback(
    (suggestion: SuggestionIdentifier) => {
      setHighlightedSuggestion({
        ...suggestion,
        globalIndex: generateGlobalIndex(suggestion),
      });
    },
    [generateGlobalIndex],
  );

  const highlightAbove = useCallback(
    (baseSuggestion: GlobalSuggestionIdentifier) => {
      const newGlobalIndex =
        baseSuggestion.globalIndex > 0
          ? baseSuggestion.globalIndex - 1
          : totalNumberOfSuggestions - 1;

      setHighlightedSuggestion({
        globalIndex: newGlobalIndex,
        ...generateRealSuggestionIndexes(newGlobalIndex),
      });
    },
    [totalNumberOfSuggestions, generateRealSuggestionIndexes],
  );

  const highlightBelow = useCallback(
    (baseSuggestion: GlobalSuggestionIdentifier) => {
      const newGlobalIndex =
        baseSuggestion.globalIndex < totalNumberOfSuggestions - 1
          ? baseSuggestion.globalIndex + 1
          : 0;

      setHighlightedSuggestion({
        globalIndex: newGlobalIndex,
        ...generateRealSuggestionIndexes(newGlobalIndex),
      });
    },
    [totalNumberOfSuggestions, generateRealSuggestionIndexes],
  );

  const removeHighlight = useCallback(() => {
    setHighlightedSuggestion({
      groupIndex: -1,
      suggestionIndex: -1,
      globalIndex: -1,
    });
  }, []);

  const isHighlighted = useCallback(
    (suggestion: SuggestionIdentifier) =>
      highlightedSuggestion.groupIndex === suggestion.groupIndex &&
      highlightedSuggestion.suggestionIndex === suggestion.suggestionIndex,
    [highlightedSuggestion],
  );

  const suggestion: SuggestionHighlightResources = useMemo(
    () => ({
      highlightedSuggestion,
      highlight,
      highlightAbove,
      highlightBelow,
      removeHighlight,
      isHighlighted,
    }),
    [
      highlightedSuggestion,
      highlight,
      highlightAbove,
      highlightBelow,
      removeHighlight,
      isHighlighted,
    ],
  );

  return suggestion;
}
