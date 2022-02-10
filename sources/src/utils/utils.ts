import {Rating, Result} from "../models/Analysis";
// @ts-ignore
import { helpers } from "yoastseo";

export function isObject(obj: any) {
  var type = typeof obj;
  return type === "function" || (type === "object" && !!obj);
}

export function summaryScore(results: Result[]): number {
  const scores = results.map((r: any) => r.score);
  const sum: any = scores.reduce((a: any, b: any) => a + b, 0) / scores.length;
  return Number(parseFloat(sum).toFixed(0));
}

export function getIndicatorColor(results: Result[]): 'bad' | 'ok' | 'good' {
  return helpers.scoreToRating(summaryScore(results));
}

export function getValidResults(assessor: any): Result[] {
  const scores = assessor.getValidResults().map((r: any) => {
    if (!isObject(r) || !r.getIdentifier()) {
      return ``;
    }
    r.rating = helpers.scoreToRating(r.score);
    return r;
  });

  return scores.filter((a: string) => a !== "");
}

export function addRating(item: Result): Rating {
  return {
    rating: item.rating,
    text: item.text,
    identifier: item.getIdentifier(),
    score: item.score
  } as Rating;
}

export function sortRatings (ratings: Rating[]) {
  return ratings.sort((a, b) => {
    // First compare the score.
    if (a.score < b.score) {
      return -1;
    } else {
      return 1
    }
  });
}
