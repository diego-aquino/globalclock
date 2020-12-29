import { Action, Position } from 'typings';

export interface LocationState {
  position: Position | null;
}

export type LocationAction = Action<
  'SET_POSITION',
  { position: Position | null }
>;

export type LocationDispatch = (action: LocationAction) => void;
