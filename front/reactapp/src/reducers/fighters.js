import { REQUEST_STATE } from '../constant/constants';

export const initialState = {
  fightersList: [
    { id: 1, name: '朝倉海', count: 0 },
    { id: 2, name: '井上直樹', count: 0 },
    { id: 3, name: '扇久保博正', count: 0 },
    { id: 4, name: '瀧澤謙太', count: 0 },
  ],
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
