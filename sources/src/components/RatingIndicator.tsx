import React from 'react';
import Box from "@mui/material/Box";

export interface RatingIndicatorProps {
  rating: 'bad' | 'ok' | 'good';
  sx?: any;
}

function getStyles(sx: any) {
  return {
    ratingIndicator: {
      content: '""',
      display: 'inline-block',
      width: '12px',
      height: '12px',
      backgroundColor: '#ddd',
      borderRadius: '6px',
      ...sx?.ratingIndicator
    },
    bad: {
      backgroundColor: '#ef404a',
      ...sx?.bad
    },
    ok: {
      backgroundColor: '#fdb813',
      ...sx?.ok
    },
    good: {
      backgroundColor: '#0db14b',
      ...sx?.good
    }
  };
}

export default function RatingIndicator(props: RatingIndicatorProps) {
  const { rating } = props;
  const sx = getStyles(props.sx);

  return (<Box sx={{ ...sx.ratingIndicator, ...sx[`${rating}`] }}/>);

}
