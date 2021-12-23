import React, { Fragment, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';

import { REQUEST_STATE } from '../constant/constants';

//mui(icon以外)
import Skeleton from '@mui/material/Skeleton';

// reducers
import {
  initialState as fightersInitialState,
  fightersActionTypes,
  fightersReducer,
} from '../reducers/fighters';

//apis
import { fetchfighters } from '../apis/fighters';

//格闘家の一つ一つのカード
import { FighterWrapper } from './../components/FighterWrapper';

//images
import AsakuraImage from './../images/asakura.png';
import InoueImage from '../images/inoue.png';
import OgikuboImage from '../images/ogikubo.png';
import TakizawaImage from '../images/takizawa.png';

const fightersImages = [AsakuraImage, InoueImage, OgikuboImage, TakizawaImage];

//styled-components
const HeaderWrapper = styled.div`
  margin-top: 30px;
  text-align: center;
  font-size: 30px;
  @media (max-width: 670px) {
    font-size: 15px;
  }
`;

const FightersWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const FightersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 600px;
  @media (max-width: 500px) {
    justify-content: center;
  }
`;

const ItemWrapper = styled.div`
  margin: 30px 30px 80px 30px;
`;

const Fighters = () => {
  const [fightersState, dispatch] = useReducer(
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
        <p>
          RIZINバンタム級トーナメント<br></br>優勝予想グランプリ
        </p>
      </HeaderWrapper>
      <FightersWrapper>
        <FightersList>
          {fightersState.fetchState === REQUEST_STATE.LOADING ? (
            <Fragment>
              {[...Array(4).keys()].map((i) => (
                <ItemWrapper key={i}>
                  <Skeleton
                    key={i}
                    variant='rectangular'
                    width={200}
                    height={200}
                  />
                </ItemWrapper>
              ))}
            </Fragment>
          ) : (
            fightersState.fightersList.map((fighter, index) => (
              <ItemWrapper key={fighter.id}>
                <FighterWrapper
                  fighter={fighter}
                  imageUrl={fightersImages[index]}
                ></FighterWrapper>
              </ItemWrapper>
            ))
          )}
        </FightersList>
      </FightersWrapper>
    </Fragment>
  );
};

export default Fighters;
