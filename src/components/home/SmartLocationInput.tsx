import React, {
  ChangeEvent,
  FC,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Merge } from 'typings';
import { MapMarkerIcon, SearchIcon } from 'assets';
import { SmartInput } from 'components/common';
import {
  SuggestionDetails,
  SuggestionSelectHandler,
} from 'components/common/smartInput/types';
import { InputComponentProps } from 'components/common/Input';
import { requestAutocompleteSuggestions } from 'services/client/location';

const suggestionIcon = <MapMarkerIcon />;

type DisplaySuggestion = SuggestionDetails;

interface PartialProps {
  onSubmit(selectedSuggestion: Here.Suggestion): void;
}

type Props = Merge<InputComponentProps, PartialProps>;

const SmartLocationInput: FC<Props> = ({ onSubmit, ...rest }) => {
  const searchStringRef = useRef('');
  const [displaySuggestions, setDisplaySuggestions] = useState<
    DisplaySuggestion[]
  >([]);
  const detailedSuggestions = useRef<Here.Suggestion[]>([]);

  const suggestionGroups = useMemo(
    () => [{ key: 'Cities', label: 'Cities', suggestions: displaySuggestions }],
    [displaySuggestions],
  );

  const updateSuggestionsIfUnchangedSearchString = useCallback(async () => {
    const searchString = searchStringRef.current;

    if (searchString === '') {
      setDisplaySuggestions([]);
      detailedSuggestions.current = [];
      return;
    }

    const suggestions = await requestAutocompleteSuggestions(searchString);

    const hasSearchStringChanged = searchString !== searchStringRef.current;
    if (hasSearchStringChanged) return;

    const newDisplaySuggestions = suggestions.map(
      ({ locationId, address }) => ({
        key: locationId,
        icon: suggestionIcon,
        title: address.city,
        subtitle: [address.state, address.country]
          .filter((resource) => !!resource)
          .join(', '),
      }),
    );

    setDisplaySuggestions(newDisplaySuggestions);
    detailedSuggestions.current = suggestions;
  }, []);

  const handleSmartInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newSearchString = event.target.value;
      searchStringRef.current = newSearchString;

      updateSuggestionsIfUnchangedSearchString();
    },
    [updateSuggestionsIfUnchangedSearchString],
  );

  const handleSuggestionSelect = useCallback<SuggestionSelectHandler>(
    ({ suggestionIndex }) => {
      const selectedDetailedSuggestion =
        detailedSuggestions.current[suggestionIndex];

      onSubmit(selectedDetailedSuggestion);
    },
    [onSubmit],
  );

  return (
    <SmartInput
      icon={<SearchIcon />}
      placeholder="Search for a city..."
      suggestionGroups={suggestionGroups}
      onSuggestionSelect={handleSuggestionSelect}
      onChange={handleSmartInputChange}
      {...rest}
    />
  );
};

export default SmartLocationInput;
