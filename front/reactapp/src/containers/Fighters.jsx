import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';

import { ResultButton } from './../Button/ResultButton';
import { HeaderAndResult } from '../styledcomponent/HeaderAndResult';

//格闘家の一つ一つのカード
import { FighterWrapper } from './../components/FighterWrapper';

//images
import AsakuraImage from './../images/asakura.png';
import InoueImage from '../images/inoue.png';
import OgikuboImage from '../images/ogikubo.png';
import TakizawaImage from '../images/takizawa.png';

//style
import { Votes } from './../components/FighterWrapper';

const fightersImages = [AsakuraImage, InoueImage, OgikuboImage, TakizawaImage];

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
  @media (max-width: 500px) {
    justify-content: center;
  }
`;

const ItemWrapper = styled.div`
  margin: 10px 30px 2px 30px;
`;

const ResultWrapper = styled(HeaderAndResult)``;

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

  useEffect(() => {
    localStorage.setItem('Fighters', JSON.stringify(fightersState));
  }, [fightersState]);

  return (
    <Fragment>
      <HeaderWrapper>
        RIZINバンタム級トーナメント<br></br>優勝予想グランプリ
        <br></br> <ResultButton></ResultButton>
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
        <p>現在の投票結果</p>
        {Rankings.sort(function (a, b) {
          return a.count > b.count ? -1 : 1;
        }).map((fighter, index) => (
          <div key={index}>
            {fighter.name}
            {fighter.count}
          </div>
        ))}
      </ResultWrapper>
    </Fragment>
  );
};

export default Fighters;
