import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';

import { HeaderAndResult } from '../styledcomponent/HeaderAndResult';

//格闘家の一つ一つのカード
import { FighterWrapper } from './../components/FighterWrapper';

//style

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

  font-size: 20px;
  @media (max-width: 450px) {
    font-size: 15px;
  }
`;

const RankingsWrapper = styled.div`
  font-weight: bolder;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
`;

const RankingsVotes = styled.div`
  font-size: 24px;
  font-family: 'Prata', serif;

  font-weight: bolder;
`;

const Fighters = () => {
  const localState = localStorage.getItem('Fighters');
  const fightersInitialState = localState
    ? JSON.parse(localState)
    : {
        fightersList: [
          { id: 1, name: '朝倉海', count: 0 },
          { id: 2, name: '井上直樹', count: 0 },
          { id: 3, name: '扇久保博正', count: 0 },
          { id: 4, name: '瀧澤謙太', count: 0 },
        ],
      };

  const [fightersState, setFightersState] = useState(fightersInitialState);

  const update = (index) => {
    setFightersState({
      fightersList: fightersState.fightersList.map((fighter, i) =>
        i === index
          ? { id: fighter.id, name: fighter.name, count: fighter.count + 1 }
          : fighter
      ),
    });
  };

  const Rankings = fightersState.fightersList.slice();

  const sortRankings = Rankings.sort(function (a, b) {
    return a.count > b.count ? -1 : 1;
  });

  const sameRankingModify = (fighter, n) => {
    let result;
    let sortRank = sortRankings[n];

    if (fighter.count === sortRank.count) {
      result = n + 1;
    } else {
      result = n + 2;
    }

    return result;
  };

  useEffect(() => {
    localStorage.setItem('Fighters', JSON.stringify(fightersState));
  }, [fightersState]);

  return (
    <Fragment>
      <HeaderWrapper>
        RIZINバンタム級トーナメント<br></br>優勝予想グランプリ
      </HeaderWrapper>
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
        <p style={{ textAlign: 'center' }}>現在の投票結果</p>
        {sortRankings.map((fighter, index) => (
          <RankingsWrapper key={index}>
            <RankingsVotes>
              {sameRankingModify(fighter, index)}位&emsp;{fighter.name}
            </RankingsVotes>
            <RankingsVotes>{fighter.count}票</RankingsVotes>
          </RankingsWrapper>
        ))}
      </ResultWrapper>
    </Fragment>
  );
};

export default Fighters;
