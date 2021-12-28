import React, { Fragment, useEffect, useState, useReducer } from 'react';
import styled from 'styled-components';
import useMedia from 'use-media';
import CircularProgress from '@mui/material/CircularProgress';
import { Helmet } from 'react-helmet';

import { HeaderAndResult } from '../styledcomponent/HeaderAndResult';

//ファイター
import { FighterWrapper } from './../components/FighterWrapper';

import { ResultButton } from '../Button/ResultButton';

//amplifyを用いたデータ取得
import { API, graphqlOperation } from 'aws-amplify';
import { listFighters } from './../queries';
import { updateFighter } from './../mutations';
import { onUpdateFighter } from './../subscriptions';

//ローディングの状態
import {
  loadingState,
  fightersActionTypes,
  fightersReducer,
} from './../reducers/fighters';

import { REQUEST_STATE } from './../constant/constants';
//styled-components
const HeaderWrapper = styled(HeaderAndResult)``;

const CircularWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const FightersWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const FightersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 600px;
  @media (max-width: 530px) {
    justify-content: center;
  }
`;

const ItemWrapper = styled.div`
  margin: 10px 30px 2px 30px;
`;

const ResultWrapper = styled.div`
  margin-top: 10px;
  width: 270px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  font-size: 20px;
  @media (max-width: 450px) {
    font-size: 15px;
  }
`;

const ResultButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const RankingsWrapper = styled.div`
  font-weight: bolder;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const RankingsVotes = styled.div`
  font-size: 24px;
  font-family: 'Prata', serif;

  font-weight: bolder;
`;

const Fighters = () => {
  const fightersInitialState = {
    fightersList: [],
  };
  const [state, dispatch] = useReducer(fightersReducer, loadingState);

  const [fightersState, setFightersState] = useState(fightersInitialState);
  const IsWide = useMedia({ minWidth: '530px' });

  const fetchAmplify = async () => {
    const AmplifyFighters = await API.graphql(graphqlOperation(listFighters));

    const sortAmplifyFighters = AmplifyFighters.data.listFighters.items;
    setFightersState({ fightersList: sortAmplifyFighters });
    dispatch({
      type: fightersActionTypes.FETCH_SUCCESS,
    });
  };

  const update = async (fighter) => {
    await API.graphql(
      graphqlOperation(updateFighter, {
        input: {
          id: fighter.id,
          count: fighter.count + 1,
        },
      })
    );
  };

  const moveResult = () => {
    window.scrollTo({
      top: IsWide ? 300 : 700,
      behavior: 'smooth',
    });
  };
  let rankArrayNumber = -1;
  let rankArrayPreviousNumber = -2;
  let rankMostPreviousNumber = -3;

  const Rankings = fightersState.fightersList.slice();

  const sortRankings = Rankings.sort(function(a, b) {
    return a.count > b.count ? -1 : 1;
  });

  const RankingModify = (
    fighter,
    number,
    previousNumber,
    mostPreviousNumber
  ) => {
    let result;
    let sortFighter = sortRankings[number] || fighter;
    let sortPreviousFighter = sortRankings[previousNumber] || { count: null };
    let mostPreviousFighter = sortRankings[mostPreviousNumber] || {
      count: null,
    };

    if (number === -1) {
      result = number + 2;
    } else if (
      fighter.count === sortFighter.count &&
      fighter.count === sortPreviousFighter.count &&
      fighter.count === mostPreviousFighter.count
    ) {
      result = number - 1;
    } else if (
      fighter.count === sortFighter.count &&
      fighter.count === sortPreviousFighter.count
    ) {
      result = number;
    } else if (sortFighter.count === fighter.count) {
      result = number + 1;
    } else if (sortFighter.count === sortPreviousFighter.count) {
      result = number + 2;
    } else {
      result = number + 2;
    }

    return result;
  };

  useEffect(() => {
    dispatch({ type: fightersActionTypes.FETCHING });

    fetchAmplify();
    API.graphql(graphqlOperation(onUpdateFighter)).subscribe({
      next: async () => {
        const AmplifyFighters = await API.graphql(
          graphqlOperation(listFighters)
        );

        const sortAmplifyFighters = AmplifyFighters.data.listFighters.items;
        setFightersState({ fightersList: sortAmplifyFighters });
      },
    });
  }, []);

  return (
    <Fragment>
      <Helmet
        title='Home'
        meta={[
          { name: 'twitter:card', content: 'summary' },
          {
            name: 'twitter:title',
            content: 'RIZINバンタム級トーナメント優勝予想グランプリ',
          },
          { name: 'twitter:description', content: 'description of Home' },
          { name: 'twitter:image', content: './../images/tournament.png' },
          {
            property: 'og:title',
            content: 'RIZINバンタム級トーナメント優勝予想グランプリ',
          },
          { property: 'og:type', content: 'website' },
          {
            property: 'og:url',
            content: 'https://sub.d2zooydtbl79td.amplifyapp.com',
          },
          { property: 'og:image', content: './../images/tournament.png' },
          {
            property: 'og:description',
            content: 'RIZINバンタム級トーナメントの優勝者を予想しよう！',
          },
        ]}
      />
      {state.fetchState === REQUEST_STATE.LOADING ? (
        <Fragment>
          <CircularWrapper>
            <CircularProgress />
          </CircularWrapper>
        </Fragment>
      ) : (
        <Fragment>
          <HeaderWrapper>
            RIZINバンタム級トーナメント<br></br>優勝予想グランプリ
          </HeaderWrapper>
          <ResultButtonWrapper>
            <ResultButton onClickScroll={moveResult}></ResultButton>
          </ResultButtonWrapper>
          <FightersWrapper>
            <FightersList>
              {fightersState.fightersList.map((fighter, index) => (
                <ItemWrapper key={index}>
                  <FighterWrapper
                    fighter={fighter}
                    onClickVote={() => update(fighter)}
                    fetchdata={() => {
                      fetchAmplify();
                    }}
                  ></FighterWrapper>
                </ItemWrapper>
              ))}
            </FightersList>
          </FightersWrapper>
          <ResultWrapper>
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
              現在の投票結果
            </p>
            {sortRankings.map((fighter, index) => (
              <RankingsWrapper key={index}>
                <RankingsVotes>
                  {RankingModify(
                    fighter,
                    rankArrayNumber++,
                    rankArrayPreviousNumber++,
                    rankMostPreviousNumber++
                  )}
                  位&emsp;
                  {fighter.name}
                </RankingsVotes>
                <RankingsVotes>{fighter.count}票</RankingsVotes>
              </RankingsWrapper>
            ))}
          </ResultWrapper>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Fighters;
