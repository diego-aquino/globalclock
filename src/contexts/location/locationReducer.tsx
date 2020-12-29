import { LocationState, LocationAction } from './locationTypes';

function locationReducer(
  state: LocationState,
  action: LocationAction,
): LocationState {
  switch (action.type) {
    case 'SET_POSITION':
      return { ...state, position: action.position };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export default locationReducer;
