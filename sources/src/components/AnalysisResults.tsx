import React from 'react';
import Presenter from './Presenter';
import {Assessor, Result} from '../models/Analysis';
import {getIndicatorColor} from '../utils/utils';
import Box from '@mui/material/Box';
import RatingIndicator from './RatingIndicator';
import AccordionItem from './AccordionItem';

interface AnalysisResultsProps {
  heading: string;
  results?: Result[];
  assessor: Assessor;
}

function getStyles() {
  return {
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
      <AccordionItem title={
        <>
          {results &&
            <RatingIndicator rating={getIndicatorColor(results)} sx={{ ratingIndicator: sx.ratingIndicator }} />
          }
          {props.heading}
        </>
      }>
        <Box>
          {results &&
            <Presenter assessor={assessor} />
          }
        </Box>
      </AccordionItem>
  );
}
