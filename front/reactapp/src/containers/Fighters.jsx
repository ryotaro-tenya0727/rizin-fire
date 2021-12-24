import React, { Fragment, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';

import { REQUEST_STATE } from '../constant/constants';

import { ResultButton } from './../Button/ResultButton';
import { HeaderAndResult } from '../styledcomponent/HeaderAndResult';

//mui(icon以外)
import Skeleton from '@mui/material/Skeleton';

// reducers
import {
  initialState as fightersInitialState,
  fightersActionTypes,
  fightersReducer,
} from '../reducers/fighters';

//apis
import { fetchfighters, postfighters } from '../apis/fighters';

//格闘家の一つ一つのカード
import { FighterWrapper } from './../components/FighterWrapper';

//投票した時のダイアログ
import { FighterVoteDialog } from './../components/FighterVoteDialog';

//images
import AsakuraImage from './../images/asakura.png';
import InoueImage from '../images/inoue.png';
import OgikuboImage from '../images/ogikubo.png';
import TakizawaImage from '../images/takizawa.png';

const fightersImages = [AsakuraImage, InoueImage, OgikuboImage, TakizawaImage];

//モーダルの閉開の状態を表す。
const initialState = {
  isOpenOrderDialog: false,
  selectedFighter: null,
};

//styled-components
const HeaderWrapper = styled(HeaderAndResult)``;

const FightersWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
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
  margin: 30px 30px 2px 30px;
`;

const ResultWrapper = styled(HeaderAndResult)``;

const Fighters = () => {
  const [fightersState, dispatch] = useReducer(
    fightersReducer,
    fightersInitialState
  );
  const [state, setState] = useState(initialState);

  const voteFighter = (fighter) => {
    postfighters({
      fighter_number: fighter.fighter_number,
    }).catch((e) => {
      throw e;
    });
  };
  useEffect(() => {
    dispatch({ type: fightersActionTypes.FETCHING });

    (async () => {
      await fetchfighters().then((data) => {
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
        <ResultButton></ResultButton>
      </HeaderWrapper>
      <FightersWrapper>
        <FightersList>
          {fightersState.fetchState === REQUEST_STATE.LOADING ? (
            <Fragment>
              {[...Array(4).keys()].map((i) => (
                <ItemWrapper key={i}>
                  <Skeleton variant='text' height={25} />
                  <Skeleton
                    key={i}
                    variant='rectangular'
                    width={200}
                    height={200}
                  />
                  <Skeleton variant='text' height={60} />
                </ItemWrapper>
              ))}
            </Fragment>
          ) : (
            fightersState.fightersList.map((fighter, index) => (
              <ItemWrapper key={fighter.id}>
                <FighterWrapper
                  fighter={fighter}
                  onClickFighterWrapper={(fighter) => {
                    setState({
                      selectedFighter: fighter,
                      isOpenOrderDialog: true,
                    });
                  }}
                  onClickVote={(fighter) => voteFighter(fighter)}
                  imageUrl={fightersImages[index]}
                ></FighterWrapper>
              </ItemWrapper>
            ))
          )}
        </FightersList>
        {state.isOpenOrderDialog && (
          <FighterVoteDialog
            isOpen={state.isOpenOrderDialog}
            fighter={state.selectedFighter}
            onClose={() =>
              setState({
                isOpenOrderDialog: false,
                selectedFighter: null,
              })
            }
          />
        )}
      </FightersWrapper>
      <ResultWrapper>
        <p>現在の投票結果</p>
      </ResultWrapper>
    </Fragment>
  );
};

export default Fighters;
