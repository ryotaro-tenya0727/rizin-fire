import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';

export const FighterVoteDialog = ({ isOpen, onClose, fighter }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{fighter.name}に投票しました！</DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};
