import './CommentsList.css';
import * as React from 'react';
import {CommentState} from '../types/index';

interface Props {
  comments: CommentState[];
}

export class CommentsList extends React.Component<Props, any> {
  renderComments() {
    return this.props.comments.map(
      (comment: CommentState, index: number) => (
        <div className="comment" key={index}>
          <b>User {comment.userId}:</b> <i>{comment.value}</i>
        </div>
      )
    );
  }

  render() {
    return (
      <div>
        <h3>Comments</h3>
        <div>{this.renderComments()}</div>
      </div>
    );
  }
}
