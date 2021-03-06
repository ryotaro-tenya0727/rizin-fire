import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#0055ff',
    },
  },
});
export const ResultButton = ({ onClickScroll }) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant='contained'
        size='large'
        color='secondary'
        sx={{ mt: 2 }}
        onClick={() => onClickScroll()}
      >
        現在の投票結果を見る
      </Button>
    </ThemeProvider>
  );
};
