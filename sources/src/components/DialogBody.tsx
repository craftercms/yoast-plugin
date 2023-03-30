import React from 'react';
import DialogContent from '@mui/material/DialogContent';

function getStyles() {
  return {
    root: {
      backgroundColor: 'rgb(250, 250, 250)',
      padding: '20px 24px !important'
    }
  }
}

export interface DialogBodyProps {
  children?: React.ReactNode;
}

export default function DialogBody(props: DialogBodyProps) {
  const sx = getStyles();

  return (
    <DialogContent sx={sx.root}>
      {props.children}
    </DialogContent>
  );
}
