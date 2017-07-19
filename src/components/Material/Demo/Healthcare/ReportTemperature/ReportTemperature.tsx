import * as React from 'react';
import TextField from 'material-ui/TextField';

export default class TextFieldExampleControlled extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      value: '98.6',
    };
  }

  handleChange = (event: any) => {
    this.setState({
      value: event.target.value,
    });
    this.props.parent.setState({
      temperature: event.target.value
    })
  };

  render() {
    return (
      <div>
        <TextField
          id="text-field-controlled"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}