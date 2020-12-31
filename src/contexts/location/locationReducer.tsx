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
    case 'SET_LOCAL_DATE_TIME':
      return { ...state, localDateTime: action.localDateTime };
    case 'SET_LOCATION_DETAILS':
      return {
        ...state,
        position: action.position || state.position,
        address: action.address || state.address,
        localDateTime: action.localDateTime || state.localDateTime,
      };
    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

export default locationReducer;
