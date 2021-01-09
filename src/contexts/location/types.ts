import { Action, Optional, PossiblyNull, Address, TimeZone } from 'typings';

export type LocationState = PossiblyNull<{
  address: Address;
  timeZone: TimeZone;
}>;

export type LocationAction =
  | Action<'SET_ADDRESS', { address: Address | null }>
  | Action<'SET_TIME_ZONE', { timeZone: TimeZone | null }>
  | Action<'SET_LOCATION_DETAILS', Optional<LocationState>>;

export type LocationDispatch = (action: LocationAction) => void;
