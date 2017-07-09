import './RatingEditor.css';
import * as classNames from 'classnames';
import * as React from 'react';
import {RatingState} from '../types/index';

interface Props {
  rating?: RatingState;
  onSetRating: Function;
}

export class RatingEditor extends React.Component<Props, any> {
  render() {
    return (
      <div className="rating">
        Set rating:{' '}
        <button
          className={
            classNames([
              'rating__button',
              {
                'is-rating-active': this.props.rating && this.props.rating.value < 0
              }
            ])
          }
          onClick={() => this.props.onSetRating(-1)}
        >
          -1
        </button>
        <button
          className={
            classNames([
              'rating__button',
              {
                'is-rating-active': (
                  !this.props.rating ||
                  (this.props.rating && !this.props.rating.value)
                )
              }
            ])
          }
          onClick={() => this.props.onSetRating(0)}
        >
          0
        </button>
        <button
          className={
            classNames([
              'rating__button',
              {
                'is-rating-active': this.props.rating && this.props.rating.value > 0
              }
            ])
          }
          onClick={() => this.props.onSetRating(1)}
        >
          +1
        </button>
      </div>
    );
  }
}
