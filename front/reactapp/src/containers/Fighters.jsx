import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import useMedia from 'use-media';

import { HeaderAndResult } from '../styledcomponent/HeaderAndResult';

//格闘家の一つ一つのカード
import { FighterWrapper } from './../components/FighterWrapper';

import { ResultButton } from '../Button/ResultButton';

//amplifyを用いたデータ取得
import { API, graphqlOperation } from 'aws-amplify';
import { listFighters } from './../queries';

//styled-components
const HeaderWrapper = styled(HeaderAndResult)``;

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
    fightersList: [
      { id: 1, name: '朝倉海', count: 0 },
      { id: 2, name: '井上直樹', count: 0 },
      { id: 3, name: '扇久保博正', count: 0 },
      { id: 4, name: '瀧澤謙太', count: 0 },
    ],
  };

  const [fightersState, setFightersState] = useState(fightersInitialState);
  const IsWide = useMedia({ minWidth: '530px' });

  const update = (index) => {
    setFightersState({
      fightersList: fightersState.fightersList.map((fighter, i) =>
        i === index
          ? { id: fighter.id, name: fighter.name, count: fighter.count + 1 }
          : fighter
      ),
    });
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
    (async () => {
      const fighters = await API.graphql(graphqlOperation(listFighters));
      console.log(fighters.data.listFighters.items);
    })();
  }, [fightersState]);

  return (
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
                onClickVote={() => update(index)}
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
  );
};

export default Fighters;
