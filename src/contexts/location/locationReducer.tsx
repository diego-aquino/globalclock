import { LocationState, LocationAction } from './types';

function locationReducer(
  state: LocationState,
  action: LocationAction,
): LocationState {
  switch (action.type) {
    case 'SET_POSITION':
      return { ...state, position: action.position };
    case 'SET_ADDRESS':
      return { ...state, address: action.address };
    case 'SET_TIME_ZONE':
      return { ...state, timeZone: action.timeZone };
    case 'SET_LOCATION_DETAILS':
      return { ...state, address: action.address, timeZone: action.timeZone };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export default locationReducer;
