import React from 'react';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import RatingIndicator from "./RatingIndicator";

interface RatingProps {
  rating: 'bad' | 'ok' | 'good';
  text: string;
  id: string;
  score: number;
}

function getStyles() {
  return {
    rating: {
      paddingLeft: '25px',
      backgroundColor: '#fff',
      position: 'relative'
    },
    ratingIndicator: {
      position: 'absolute',
      top: '13px',
      left: 0
    },
    heading: {
      textTransform: 'uppercase',
      display: 'block',
      fontSize: '70%',
      marginBottom: '5px'
    },
    badColor: {
      color: '#e2401b'
    },
    okColor: {
      color: '#fdb813'
    },
    goodColor: {
      color: '#0db14b'
    },
    badBackground: {
      backgroundColor: '#ef404a'
    },
    okBackground: {
      backgroundColor: '#fdb813'
    },
    goodBackground: {
      backgroundColor: '#0db14b'
    }
  }
};

export default function Rating(props: RatingProps) {
  const { rating, text, id } = props;
  const sx = getStyles();

  // TODO: see if I can remove the ts-ignore after changing card to listItem
  return (
    // @ts-ignore
    <ListItem key={id} sx={sx.rating}>
      <RatingIndicator rating={rating} sx={{ ratingIndicator: sx.ratingIndicator }} />
      <Typography variant="body1" dangerouslySetInnerHTML={{ __html: text }} />
    </ListItem>
  );
}
