import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
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

const MIN_SEARCH_STRING_IDLE_DURATION = 250;
const suggestionIcon = <MapMarkerIcon />;

type DisplaySuggestion = SuggestionDetails;

interface PartialProps {
  onSubmit(selectedSuggestion: Here.Suggestion): void;
}

type Props = Merge<InputComponentProps, PartialProps>;

const SmartLocationInput: FC<Props> = ({ onSubmit, ...rest }) => {
  const [searchString, setSearchString] = useState('');
  const [displaySuggestions, setDisplaySuggestions] = useState<
    DisplaySuggestion[]
  >([]);
  const detailedSuggestions = useRef<Here.Suggestion[]>([]);

  const suggestionGroups = useMemo(
    () => [{ key: 'Cities', label: 'Cities', suggestions: displaySuggestions }],
    [displaySuggestions],
  );

  const handleSmartInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchString(event.target.value);
    },
    [],
  );

  const handleSuggestionSelect = useCallback<SuggestionSelectHandler>(
    ({ suggestionIndex }) => {
      const selectedDetailedSuggestion =
        detailedSuggestions.current[suggestionIndex];

      onSubmit(selectedDetailedSuggestion);
    },
    [onSubmit],
  );

  const updateSuggestions = useCallback(async (baseSearchString: string) => {
    if (baseSearchString === '') {
      setDisplaySuggestions([]);
      detailedSuggestions.current = [];
      return;
    }

    const autocompleteSuggestions = await requestAutocompleteSuggestions(
      baseSearchString,
    );

    const newDisplaySuggestions = autocompleteSuggestions.map(
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
    detailedSuggestions.current = autocompleteSuggestions;
  }, []);

  useEffect(() => {
    const lastStoredSearchString = searchString;

    const timeoutToUpdateSuggestions = setTimeout(async () => {
      const hasSearchStringChanged = searchString !== lastStoredSearchString;

      if (!hasSearchStringChanged) {
        updateSuggestions(searchString);
      }
    }, MIN_SEARCH_STRING_IDLE_DURATION);

    return () => clearTimeout(timeoutToUpdateSuggestions);
  }, [searchString, updateSuggestions]);

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
