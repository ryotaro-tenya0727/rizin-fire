import React, { Fragment } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//styled-components

const Name = styled.div`
  text-align: center;
  font-size: 28px;
`;

const Votes = styled.div`
  text-align: center;
  font-size: 24px;
`;

const Card = styled.div`
  width: 200px;
  height: 200px;
`;

const FighterImageNode = styled.img`
  width: 200px;
`;

const theme = createTheme({
  palette: {
    secondary: {
      main: '#FF0000',
    },
  },
});

const ButtonWrapper = styled.div`
  text-align: center;
`;

export const FighterWrapper = ({
  fighter,
  imageUrl,

  onClickVote,
}) => {
  return (
    <Fragment>
      <Name>{fighter.name}</Name>
      <Votes>獲得票数{fighter.count}</Votes>
      <Card>
        <FighterImageNode src={imageUrl} />
      </Card>
      <ThemeProvider theme={theme}>
        <ButtonWrapper>
          <Button
            variant='contained'
            size='large'
            color='secondary'
            sx={{ width: '100%', mt: 1 }}
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
