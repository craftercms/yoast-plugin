import React from "react";
import Rating from "./Rating";
import {addRating, getValidResults, sortRatings} from "../utils/utils";
import {Assessor, Rating as RatingModel} from '../models/Analysis';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

interface PresenterProps {
  assessor: Assessor;
}

export default function Presenter(props: PresenterProps) {
  const { assessor } = props;

  let ratings: RatingModel[] = [];
  Object.entries(getValidResults(assessor)).forEach(([, item]) => {
    ratings.push(addRating(item));
  });

  const badRatings = ratings.filter(({rating}) => rating === 'ok' || rating === 'bad');
  const goodRatings = ratings.filter(({rating}) => rating === 'good');

  return (
    <>
      <Typography variant="subtitle1" component="div">
        Problems ({badRatings.length})
      </Typography>
      <List>
        {sortRatings(badRatings)
          .map(rating => (
            <Rating
              key={rating.identifier}
              id={rating.identifier}
              rating={rating.rating}
              text={rating.text}
              score={rating.score}
            />
          ))}
      </List>

      <Typography variant="subtitle1" gutterBottom component="div">
        Good results ({goodRatings.length})
      </Typography>
      <List>
        {sortRatings(goodRatings)
          .map(rating => (
            <Rating
              key={rating.identifier}
              id={rating.identifier}
              rating={rating.rating}
              text={rating.text}
              score={rating.score}
            />
          ))}
      </List>
    </>
  );
}
