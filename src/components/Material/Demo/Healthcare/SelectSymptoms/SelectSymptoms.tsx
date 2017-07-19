import * as React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const symptoms = [
  'Abdominal pain',
  'Blood in stool',
  'Chest pain',
  'Constipation',
  'Cough',
  'Diarrhea',
  'Difficulty swallowing',
  'Dizziness'
];

export default class SelectFieldExampleMultiSelect extends React.Component<any, any> {
  state = {
    values: [],
  };

  handleChange = (event: any, index: any, values: any) => {
    // console.log('LOLOLOL: ', this.props)
    this.props.parent.setState({
      symptoms: values
    })
    this.setState({ values });
  }

  menuItems(values: any) {
    return symptoms.map((name) => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ));
  }

  render() {
    return (
      <SelectField
        style={{width: '100%'}}
        multiple={true}
        hintText="Select symptoms"
        value={this.state.values}
        onChange={this.handleChange}
      >
        {this.menuItems(this.state.values)}
      </SelectField>
    );
  }
}