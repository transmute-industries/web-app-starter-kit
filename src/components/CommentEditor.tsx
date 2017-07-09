import './CommentEditor.css';
import * as React from 'react';

interface Props {
  onCommentSubmit: (comment: string) => void;
}

interface State {
  text: string;
}

export class CommentEditor extends React.Component<Props, State> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {
      text: ''
    };
  }

  handleSubmit(event: any) {
    const text = event.target.value.trim();
    if (event.which === 13) {
      this.props.onCommentSubmit(text);
      this.setState({ text: '' });
    }
  }

  handleChange(event: any) {
    this.setState({ text: event.target.value });
  }

  render () {
    return (
      <div className="comment-editor">
        <input
          type="text"
          placeholder="Leave a comment"
          value={this.state.text}
          onChange={(event) => this.handleChange(event)}
          onKeyDown={(event) => this.handleSubmit(event)}
        />
      </div>
    );
  }
}
