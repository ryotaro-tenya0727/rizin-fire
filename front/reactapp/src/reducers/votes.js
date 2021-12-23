const REQUEST_STATE = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  OK: 'OK',
};

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  votesList: [],
};

export const votesActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const votesReducer = (state, action) => {
  switch (action.type) {
    case votesActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case votesActionTypes.FETCH_SUCCESS:
      //この時foofinitialstateは
      //{fetchState: 'OK', votesList: [フードのオブジェクトが入っている。] }
      return {
        fetchState: REQUEST_STATE.OK,
        votesList: action.payload.votes,
      };
    default:
      throw new Error();
  }
};
