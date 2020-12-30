import { Action, Address, Position, TimeZone } from 'typings';

export interface LocationState {
  position: Position | null;
  address: Address | null;
  timeZone: TimeZone | null;
}

export type LocationAction =
  | Action<'SET_POSITION', { position: Position | null }>
  | Action<'SET_ADDRESS', { address: Address | null }>
  | Action<'SET_TIME_ZONE', { timeZone: TimeZone | null }>
  | Action<
      'SET_LOCATION_DETAILS',
      { address: Address | null; timeZone: TimeZone | null }
    >;

export type LocationDispatch = (action: LocationAction) => void;
