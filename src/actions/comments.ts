import {SUBMIT_COMMENT} from '../constants/comments';

export const submitComment = (comment: string) => {
  return {
    type: SUBMIT_COMMENT,
    comment
  };
};
