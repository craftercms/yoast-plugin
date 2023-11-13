import React, {PropsWithChildren, ReactNode} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from '@mui/material/Typography';

function getStyles() {
  return {
    root: {
      boxShadow: 'none',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      bgcolor: 'background.paper',
      backgroundImage: 'none'
    }
  }
}

export type AccordionItemProps = PropsWithChildren<{
  title: ReactNode;
}>;

export default function AccordionItem(props: AccordionItemProps) {
  const { title, children } = props;
  const sx = getStyles();

  return (
    <Accordion disableGutters sx={sx.root}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="subtitle1" fontWeight="bold">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        { children }
      </AccordionDetails>
    </Accordion>
  );
}
