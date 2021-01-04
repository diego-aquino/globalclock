import { DateTime } from 'luxon';

import {
  Action,
  Optional,
  PossiblyNull,
  Position,
  Address,
  Location,
} from 'typings';

export type LocationState = PossiblyNull<
  Location & {
    baseDeviceDateTime: DateTime;
  }
>;

export type LocationAction =
  | Action<'SET_POSITION', { position: Position | null }>
  | Action<'SET_ADDRESS', { address: Address | null }>
  | Action<'SET_LOCAL_DATE_TIME', { localDateTime: DateTime | null }>
  | Action<'SET_LOCATION_DETAILS', Optional<LocationState>>;

export type LocationDispatch = (action: LocationAction) => void;
