import React, {useState} from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Dialog from '@mui/material/Dialog';
import DialogHeader from '../components/DialogHeader';
import FacebookPreview from '../yoast/social-metadata-previews/facebook/FacebookPreview';
import DialogBody from "./DialogBody";

function getStyles () {
  return {
    root: {
      paddingBottom: '10px',
      paddingTop: '10px'
    },
    listItemText: {
      '& span': {
        fontWeight: 700,
        color: 'rgba(0, 0, 0, 0.87)'
      }
    },
    listItemIcon: {
      marginLeft: 'auto'
    }
  }
}

export interface FacebookPreviewProps {
  siteUrl: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

export interface FacebookPreviewToolProps {
  data?: FacebookPreviewProps;
}

// @ts-ignore
export default function FacebookPreviewTool(props: FacebookPreviewToolProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const sx = getStyles();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  return <>
    <ListItemButton onClick={handleClickOpen} divider sx={sx.root}>
      <ListItemText primary="Facebook Preview" sx={sx.listItemText}/>
      <ListItemIcon>
        <OpenInNewIcon sx={sx.listItemIcon} />
      </ListItemIcon>
    </ListItemButton>
    <Dialog
      fullWidth
      maxWidth="sm"
      open={openDialog}
      onClose={handleClose}
    >
      <DialogHeader onClose={handleClose}>Facebook Preview</DialogHeader>
      <DialogBody>
        <FacebookPreview { ...props.data } mode="landscape" />
      </DialogBody>
    </Dialog>
  </>;
}
