import * as React from 'react';
import {Character} from './Character';
import {CharacterState} from '../types/index';

interface Props {
  characters: CharacterState[];
  onCharacterClick: Function;
}

export class Characters extends React.Component<Props, any> {
  renderCharacters(_characters: CharacterState[]) {
    const _this = this;
    return _characters.map(
      function (character: CharacterState, index: number) {
        return (
          <Character
            {...character}
            key={index}
            onCharacterClick={(characterDetails: CharacterState) => {
              _this.props.onCharacterClick(characterDetails);
            }}
          />
        );
      },
      this
    );
  }

  render() {
    return (
      <div>
        <h2>Character List</h2>
        {this.renderCharacters(this.props.characters)}
      </div>
    );
  }
}
