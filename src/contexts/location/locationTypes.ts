import { Action, Position } from 'typings';

export interface LocationState {
  position: Position;
}

export type LocationAction = Action<'SET_POSITION', { position: Position }>;

export type LocationDispatch = (action: LocationAction) => void;
