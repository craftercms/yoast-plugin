import React, {useState} from 'react';
import { MODE_DESKTOP, MODE_MOBILE } from "../yoast/search-metadata-previews/snippet-preview/constants";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import SnippetPreview from "../yoast/search-metadata-previews/snippet-preview/SnippetPreview";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Dialog from '@mui/material/Dialog';
import DialogHeader from "./DialogHeader";
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

export interface GooglePreviewProps {
  title: string;
  description?: string;
  url?: string;
  onMouseUp?(field: string): any;
}

export interface GooglePreviewToolProps {
  data?: GooglePreviewProps;
}

export default function GooglePreviewTool(props: GooglePreviewToolProps) {
  const [previewMode, setPreviewMode] = useState(MODE_DESKTOP);
  const [openDialog, setOpenDialog] = useState(false);
  const sx = getStyles();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const togglePreviewMode = () => {
    setPreviewMode(previewMode === MODE_DESKTOP ? MODE_MOBILE : MODE_DESKTOP)
  }

  return (
    <>
      <ListItemButton onClick={handleClickOpen} divider sx={sx.root}>
        <ListItemText primary="Google Preview" sx={sx.listItemText}/>
        <ListItemIcon>
          <OpenInNewIcon sx={sx.listItemIcon} />
        </ListItemIcon>
      </ListItemButton>
      <Dialog
        fullWidth
        maxWidth="md"
        open={openDialog}
        onClose={handleClose}
      >
        <DialogHeader onClose={handleClose}>Google Preview</DialogHeader>
        <DialogBody>
          {
            props.data?.title &&
            <>
              <FormControl>
                <FormLabel>Preview as:</FormLabel>
                <RadioGroup
                  row
                  value={previewMode}
                  onChange={togglePreviewMode}
                >
                  <FormControlLabel value="desktop" control={<Radio />} label="Desktop" />
                  <FormControlLabel value="mobile" control={<Radio />} label="Mobile" />
                </RadioGroup>
              </FormControl>
              <Divider light sx={{ mt: 1, mb: 2 }} />
              <SnippetPreview { ...props.data } mode={previewMode} />
            </>
          }
        </DialogBody>
      </Dialog>
    </>
  );
}
