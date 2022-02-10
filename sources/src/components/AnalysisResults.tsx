import React from "react";
import Presenter from "./Presenter";
import {Assessor, Result} from "../models/Analysis";
import {getIndicatorColor} from "../utils/utils";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RatingIndicator from "./RatingIndicator";

interface AnalysisResultsProps {
  heading: string;
  results?: Result[];
  assessor: Assessor;
}

function getStyles() {
  return {
    root: {
      boxShadow: 'none',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    },
    ratingIndicator: {
      marginRight: '12px'
    },
    bad: {
      color: '#e2401b'
    },
    ok: {
      color: '#fdb813'
    },
    good: {
      color: '#0db14b'
    }
  }
}

export default function AnalysisResults(props: AnalysisResultsProps) {
  const { results, assessor } = props;
  const sx = getStyles();

  return (
    <Accordion disableGutters sx={sx.root}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {results &&
            <RatingIndicator rating={getIndicatorColor(results)} sx={{ ratingIndicator: sx.ratingIndicator }} />
          }
          {props.heading}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {results &&
            <Presenter assessor={assessor} />
          }
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
