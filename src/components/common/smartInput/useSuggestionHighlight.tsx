import { ReactElement, useCallback, useMemo, useState } from 'react';

interface SuggestionIdentifier {
  groupIndex: number;
  suggestionIndex: number;
}

type GlobalSuggestionIdentifier = SuggestionIdentifier & {
  globalIndex: number;
};

export interface SuggestionDetails {
  key: string;
  title: string;
  icon?: HTMLElement | ReactElement;
  subtitle?: string;
}

export interface SuggestionGroup {
  key: string;
  label: string;
  suggestions: SuggestionDetails[];
}

interface SuggestionHighlightResources {
  highlightedSuggestion: GlobalSuggestionIdentifier;
  highlight: (suggestion: SuggestionIdentifier) => void;
  highlightAbove: (baseSuggestion?: GlobalSuggestionIdentifier) => void;
  highlightBelow: (baseSuggestion?: GlobalSuggestionIdentifier) => void;
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
    (baseSuggestion: GlobalSuggestionIdentifier = highlightedSuggestion) => {
      const newGlobalIndex =
        baseSuggestion.globalIndex > 0
          ? baseSuggestion.globalIndex - 1
          : totalNumberOfSuggestions - 1;

      setHighlightedSuggestion({
        globalIndex: newGlobalIndex,
        ...generateRealSuggestionIndexes(newGlobalIndex),
      });
    },
    [
      highlightedSuggestion,
      totalNumberOfSuggestions,
      generateRealSuggestionIndexes,
    ],
  );
  const highlightBelow = useCallback(
    (baseSuggestion: GlobalSuggestionIdentifier = highlightedSuggestion) => {
      const newGlobalIndex =
        baseSuggestion.globalIndex < totalNumberOfSuggestions - 1
          ? baseSuggestion.globalIndex + 1
          : 0;

      setHighlightedSuggestion({
        globalIndex: newGlobalIndex,
        ...generateRealSuggestionIndexes(newGlobalIndex),
      });
    },
    [
      highlightedSuggestion,
      totalNumberOfSuggestions,
      generateRealSuggestionIndexes,
    ],
  );

  const suggestion: SuggestionHighlightResources = useMemo(
    () => ({
      highlightedSuggestion,
      highlight,
      highlightAbove,
      highlightBelow,
    }),
    [highlightedSuggestion, highlight, highlightAbove, highlightBelow],
  );

  return suggestion;
}
