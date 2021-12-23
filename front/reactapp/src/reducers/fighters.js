import { REQUEST_STATE } from '../constant/constants';

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  fightersList: [],
};

export const fightersActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const fightersReducer = (state, action) => {
  switch (action.type) {
    case fightersActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case fightersActionTypes.FETCH_SUCCESS:
      //この時fightersinitialstateは
      //{fetchState: 'OK', fightersList: [フードのオブジェクトが入っている。] }
      return {
        fetchState: REQUEST_STATE.OK,
        fightersList: action.payload.fighters,
      };
    default:
      throw new Error();
  }
};
