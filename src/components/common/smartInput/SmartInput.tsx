import React, { FC, ReactElement, useCallback, useMemo } from 'react';

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
  const shouldShowSuggestions = useMemo(() => {
    const atLeastOneGroupHasSuggestions = !!suggestionGroups?.some(
      (group) => group.suggestions.length > 0,
    );

    return atLeastOneGroupHasSuggestions;
  }, [suggestionGroups]);

  const renderSuggestions = useCallback(
    (suggestions: Suggestion[]) =>
      suggestions.map(({ key, icon, title, subtitle }) => (
        <Suggestion key={key} icon={icon} title={title} subtitle={subtitle} />
      )),
    [],
  );

  const renderSuggestionGroups = useCallback(
    (groups: SuggestionGroup[]) =>
      groups.map(({ key, label, suggestions }) => {
        const hasNoSuggestions = suggestions.length === 0;
        if (hasNoSuggestions) return null;

        return (
          <SuggestionGroupContainer key={key}>
            <p>{label}</p>
            <div>{renderSuggestions(suggestions)}</div>
          </SuggestionGroupContainer>
        );
      }),
    [renderSuggestions],
  );

  return (
    <Container hasActiveSuggestions={shouldShowSuggestions}>
      <StyledInput hasActiveSuggestions={shouldShowSuggestions} {...rest} />

      {suggestionGroups && shouldShowSuggestions && (
        <SuggestionsContainer>
          {renderSuggestionGroups(suggestionGroups)}
        </SuggestionsContainer>
      )}
    </Container>
  );
};

export default SmartInput;
