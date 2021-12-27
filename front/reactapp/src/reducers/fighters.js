import { REQUEST_STATE } from '../constant/constants';

export const loadingState = {
  fetchState: REQUEST_STATE.INITIAL,
};

export const fightersActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const fightersReducer = (state, action) => {
  switch (action.type) {
    case fightersActionTypes.FETCHING:
      return {
        fetchState: REQUEST_STATE.LOADING,
      };
    case fightersActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
      };
    default:
      throw new Error();
  }
};
