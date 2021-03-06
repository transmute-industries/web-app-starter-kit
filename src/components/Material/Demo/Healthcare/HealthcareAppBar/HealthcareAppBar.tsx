import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';

import { connect } from 'react-redux'
import { getFactoryReadModel} from '../../../../../actions/transmute'

class Login extends React.Component {
  static muiName = 'FlatButton';
  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
}
const Logged: any = (props: any) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

Logged.muiName = 'IconMenu';
class HealthcareAppBar extends React.Component<any, any> {
  state = {
    logged: true,
    open: false
  };
  handleChange = (event: any, logged: any) => {
    this.setState({ logged: logged });
  };
  handleToggle = () => this.setState({ open: !this.state.open });

  handleTitleTouch = () => {
    this.props.dispatch({
      type: 'DEMO_LOAD',
      payload: {
        contractAddress: null,
        view: 'factory'
      }
    })
    this.props.dispatch(getFactoryReadModel(this.props.transmute.defaultAddress))
  }
  render() {
    return (
      <div>
        <AppBar
          title="Patient DB"
          onTitleTouchTap={this.handleTitleTouch}
          iconElementLeft={<IconButton onTouchTap={this.handleToggle}><Menu /></IconButton>}
          iconElementRight={this.state.logged ? <Logged /> : <Login />}
        />
        <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({ open })}>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <Toggle
            label="Logged"
            defaultToggled={true}
            onToggle={this.handleChange}
            labelPosition="right"
            style={{ margin: 20 }}
          />
        </Drawer>
      </div>
    );
  }
}

let comp: any = HealthcareAppBar;
export default connect((state: any) => ({
  transmute: state.transmute
}))(comp)
