import {StoreState, CommentState} from '../types/index';
import {SUBMIT_COMMENT} from '../constants/comments';

interface CustomAction {
  type: string;
  comment: string;
}

export function comments(state: StoreState, action: CustomAction): CommentState[] {
  switch (action.type) {
    case SUBMIT_COMMENT:
      const loggedInUser = state.users.filter(user => user.isLoggedIn)[0];

      const _state = state.comments.slice();

      _state.push({
        id: state.comments.length,
        value: action.comment,
        userId: loggedInUser.id,
        characterId: state.characterDetails.id,
      });

      return _state;
    default:
      return state.comments ? state.comments : [];
  }
}
