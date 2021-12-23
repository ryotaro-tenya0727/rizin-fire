import React, { Fragment } from 'react';
import styled from 'styled-components';

//styled-components

const Name = styled.div`
  text-align: center;
`;

const Card = styled.div`
  width: 200px;
  height: 200px;
  border-width: 3px;
  border-style: solid;
  border-image: initial;
`;

const FighterImageNode = styled.img`
  width: 200px;
`;

export const FighterWrapper = ({ fighter, imageUrl }) => {
  return (
    <Fragment>
      <Name>{fighter.name}</Name>
      <Card>
        <FighterImageNode src={imageUrl} />
      </Card>
    </Fragment>
  );
};
