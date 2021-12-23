import React from 'react';
import styled from 'styled-components';

//styled-components
const Wrapper = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  border-width: 3px;
  border-style: solid;
  border-image: initial;
  cursor: pointer;
`;

export const FighterWrapper = () => {
  return <Wrapper></Wrapper>;
};
