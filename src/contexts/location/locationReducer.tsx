import { LocationState, LocationAction } from './types';

function locationReducer(
  state: LocationState,
  action: LocationAction,
): LocationState {
  switch (action.type) {
    case 'SET_ADDRESS':
      return { ...state, address: action.address };
    case 'SET_TIME_ZONE':
      return { ...state, timeZone: action.timeZone };
    case 'SET_LOCATION_DETAILS':
      return {
        ...state,
        address: action.address || state.address,
        timeZone: action.timeZone || state.timeZone,
      };
    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

export default locationReducer;
