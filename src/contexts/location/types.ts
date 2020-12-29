import { Action, Address, Position } from 'typings';

export interface LocationState {
  position: Position | null;
  address: Address | null;
}

export type LocationAction =
  | Action<'SET_POSITION', { position: Position | null }>
  | Action<'SET_ADDRESS', { address: Address | null }>;

export type LocationDispatch = (action: LocationAction) => void;
