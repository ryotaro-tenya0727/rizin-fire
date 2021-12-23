import React, { Fragment, useEffect, useReducer } from 'react';

// constants
import { REQUEST_STATE } from './../reducers/votes';

import {
  initialState as votesInitialState,
  votesActionTypes,
  votesReducer,
} from '../reducers/votes';

const Votes = () => {
  const [votesState, dispatch] = useReducer(votesReducer, votesInitialState);
  return <Fragment>RIZIN</Fragment>;
};

export default Votes;
