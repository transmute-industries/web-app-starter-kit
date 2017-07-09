import * as React from 'react';
import {UserState, RatingState} from '../../types/index';
import {UserSelector} from './UserSelector';
import {CommentEditor} from './CommentEditor';
import {RatingEditor} from './RatingEditor';

interface Props {
  users: UserState[];
  rating?: RatingState;
  loginAsUser: Function;
  submitComment: Function;
  setRating: Function;
}

export class Editor extends React.Component<Props, any> {
  render () {
    const {
      loginAsUser,
      submitComment,
      setRating,
    } = this.props;

    return (
      <div>
        <h3>Editor</h3>
        <UserSelector {...this.props} loginAsUser={(user: UserState) => loginAsUser(user)}/>
        <CommentEditor onCommentSubmit={(comment: string) => submitComment(comment)}/>
        <RatingEditor
          rating={this.props.rating}
          onSetRating={(rating: number) => setRating(rating)}
        />
      </div>
    );
  }
}
