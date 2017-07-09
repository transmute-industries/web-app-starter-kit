import './UserSelector.css';
import * as React from 'react';
import {UserState} from '../types/index';

interface Props {
  users: UserState[];
  loginAsUser: Function;
}

export class UserSelector extends React.Component<Props, any> {
  renderUsers() {
    const _this = this;

    return this.props.users.map(
      (user, index) => {
        return (
          <span
            className="user"
            key={index}
            style={{backgroundColor: user.color}}
            onClick={() => _this.props.loginAsUser(user)}
          >
            {user.name}
          </span>
        );
      }
    );
  }

  renderLoggedInUser() {
    return this.props.users
      .filter((user) => user.isLoggedIn)
      .map(
        (user, index) => {
          return (
            <span
              key={index}
              className="user"
              style={{backgroundColor: user.color}}
            >
              {user.name}
            </span>
          );
        }
    );
  }

  render() {
    return (
      <div>
        <p>
          Click user to login:
          {this.renderUsers()}
        </p>
        <p>
          Logged in as:
          {this.renderLoggedInUser()}
        </p>
      </div>
    );
  }
}
