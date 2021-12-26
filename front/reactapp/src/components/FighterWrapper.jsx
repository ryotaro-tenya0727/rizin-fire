import React, { Fragment } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//styled-components

const Name = styled.div`
  text-align: center;
  font-size: 28px;
  font-weight: bolder;
`;

const VotesWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const VotesString = styled.span`
  font-size: 24px;
  font-weight: bolder;
`;

const Votes = styled.div`
  font-size: 24px;
  font-family: 'Prata', serif;
  text-align: center;
  font-weight: bolder;
`;

const theme = createTheme({
  palette: {
    secondary: {
      main: '#FF0000',
    },
  },
});

const ButtonWrapper = styled.div``;

export const FighterWrapper = ({ fighter, onClickVote }) => {
  return (
    <Fragment>
      <Name>{fighter.name}</Name>
      <VotesWrapper>
        <Votes>{fighter.count.toLocaleString()}</Votes>
        <VotesString>票</VotesString>
      </VotesWrapper>

      <ThemeProvider theme={theme}>
        <ButtonWrapper>
          <Button
            variant='contained'
            size='large'
            color='secondary'
            sx={{ width: '200px', mt: 1 }}
            onClick={() => {
              onClickVote();
            }}
          >
            {fighter.name}に投票する
          </Button>
        </ButtonWrapper>
      </ThemeProvider>
    </Fragment>
  );
};
