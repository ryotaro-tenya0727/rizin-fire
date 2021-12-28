import React, { Fragment } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';

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

const theme2 = createTheme({
  palette: {
    secondary: {
      main: '#1D9BF0',
    },
  },
});

const ButtonWrapper = styled.div``;

const TwitterWrapper = styled.div``;
export const FighterWrapper = ({ fighter, onClickVote, fetchdata }) => {
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
            onClick={async () => {
              await onClickVote();
              fetchdata();
            }}
          >
            {fighter.name}に投票する
          </Button>
          <TwitterWrapper>
            <ThemeProvider theme={theme2}>
              <Button
                variant='contained'
                color='secondary'
                sx={{ width: '200px', mt: 1 }}
                href={`https://twitter.com/intent/tweet?text=${fighter.name}が優勝！%0ahttps://sub.d2zooydtbl79td.amplifyapp.com/%0a%23RIZIN%0a%23バンタム級トーナメント`}
                target='_blank'
              >
                <TwitterIcon sx={{ mr: 1.5, mb: 0.1 }} />
                ツイートで広める
              </Button>
            </ThemeProvider>
          </TwitterWrapper>
        </ButtonWrapper>
      </ThemeProvider>
    </Fragment>
  );
};
