import React, { Fragment, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';

import { REQUEST_STATE } from '../constant/constants';

// reducers
import {
  initialState as fightersInitialState,
  fightersActionTypes,
  fightersReducer,
} from '../reducers/fighters';

//apis
import { fetchfighters } from '../apis/fighters';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Fighters = () => {
  const [fightersstate, dispatch] = useReducer(
    fightersReducer,
    fightersInitialState
  );
  useEffect(() => {
    dispatch({ type: fightersActionTypes.FETCHING });

    (async () => {
      await fetchfighters().then((data) => {
        console.log(data.fighters);
        dispatch({
          type: fightersActionTypes.FETCH_SUCCESS,
          payload: { fighters: data.fighters },
        });
      });
      //ここに処理
    })();
  }, []);

  return (
    <Fragment>
      <HeaderWrapper>
        <h1>RIZINバンタム級トーナメント優勝予想グランプリ</h1>
      </HeaderWrapper>
      {fightersstate.fightersList.map((item, index) => (
        <div key={index}>{item.name}</div>
      ))}
    </Fragment>
  );
};

export default Fighters;
