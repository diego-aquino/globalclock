import React, {
  ChangeEvent,
  FC,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import { CitySuggestion, Merge } from 'typings';
import { MapMarkerIcon, SearchIcon } from 'assets';
import { SmartInput } from 'components/common';
import {
  SuggestionDetails,
  SuggestionSelectHandler,
} from 'components/common/smartInput/types';
import { InputComponentProps } from 'components/common/Input';
import { requestAutocompleteSuggestions } from 'services/client/location';
import message from 'utils/message';
import messageContents from 'utils/message/messageContents';

const suggestionIcon = <MapMarkerIcon />;

type DisplaySuggestion = SuggestionDetails;

interface PartialProps {
  onSubmit(selectedSuggestion: CitySuggestion): void;
}

type Props = Merge<InputComponentProps, PartialProps>;

const SmartLocationInput: FC<Props> = ({ onSubmit, ...rest }) => {
  const searchStringRef = useRef('');
  const [displaySuggestions, setDisplaySuggestions] = useState<
    DisplaySuggestion[]
  >([]);
  const detailedSuggestions = useRef<CitySuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

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

    setIsLoadingSuggestions(true);
    const suggestions = await requestAutocompleteSuggestions(
      searchString,
    ).catch(() => null);

    const hasSearchStringChanged = searchString !== searchStringRef.current;
    if (hasSearchStringChanged) return;

    setIsLoadingSuggestions(false);

    if (!suggestions) {
      message(messageContents['default.somethingWentWrong']);
      return;
    }

    const newDisplaySuggestions = suggestions.map(
      ({ locationId, address }) => ({
        key: locationId,
        icon: suggestionIcon,
        title: address.cityName,
        subtitle: [address.stateName, address.countryName]
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
      loading={isLoadingSuggestions}
      onSuggestionSelect={handleSuggestionSelect}
      onChange={handleSmartInputChange}
      clearButtonEnabled
      {...rest}
    />
  );
};

export default SmartLocationInput;
