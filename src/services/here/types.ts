export interface Address {
  city: string;
  countryCode: string;
  countryName: string;
  district: string;
  houseNumber: number;
  label: string;
  postalCode: string;
  state: string;
  stateCode: string;
  street: string;
}

interface HereLocationItem {
  address: Address;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
}

export type HereLocationResult = { items: HereLocationItem[] };

interface HereSearchService {
  reverseGeocode(
    params: { at: string },
    onResult: (result: HereLocationResult) => void,
    onError: (error: Error) => void,
  ): void;
}

interface HerePlatform {
  getSearchService(): HereSearchService;
}

type HerePlatformConstructor = new (
  options: { app_id: string; apikey: string }, // eslint-disable-line camelcase
) => HerePlatform;

export interface HereService {
  Platform: HerePlatformConstructor;
}
