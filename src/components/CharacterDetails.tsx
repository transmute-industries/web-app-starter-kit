import './CharacterDetails.css';
import * as React from 'react';
import {CharacterState, UserState, CommentState, RatingsState} from '../types/index';
import {Editor} from './Editor';
import {CommentsList} from './CommentsList';

interface ExtendedCharacterState {
  characterDetails: CharacterState;
  comments: CommentState[];
  users: UserState[];
  ratings: RatingsState;
  loginAsUser: Function;
  submitComment: Function;
  setRating: Function;
}

export const CharacterDetails = (
  {
    characterDetails,
    comments,
    users,
    ratings,
    loginAsUser,
    submitComment,
    setRating,
  }: ExtendedCharacterState
) => {
  const filteredComments = comments.filter(comment => comment.characterId === characterDetails.id);
  const loggedInUser = users.filter(user => user.isLoggedIn)[0];
  const characterRatingByUser = ratings[`${loggedInUser.id}-${characterDetails.id}`];

  return (
    <div className="character-details">
      <h2>Character Details</h2>
      <p><b>Name</b> {characterDetails.name}</p>
      <p><b>Gender</b> {characterDetails.gender}</p>
      <p><b>ID</b> {characterDetails.id}</p>
      <CommentsList
        comments={filteredComments}
      />
      <Editor
        users={users}
        rating={characterRatingByUser}
        loginAsUser={(user: UserState) => loginAsUser(user)}
        submitComment={(comment: string) => submitComment(comment)}
        setRating={(rating: string) => setRating(rating)}
      />
    </div>
  );
};
