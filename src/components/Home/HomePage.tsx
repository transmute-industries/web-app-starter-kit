import * as React from 'react';

import { Particle } from '../Common/Particle/Particle'

import './HomePage.css';


import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MuiThemeProvider, lightBaseTheme } from 'material-ui/styles';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

import RaisedButton from 'material-ui/RaisedButton';

import { Button } from 'reactstrap';

import { push } from 'react-router-redux'

import { store } from '../../store/store';


export default class HomePage extends React.Component<any, any> {
    launchDemo(path: string) {
        console.log(path)
        store.dispatch(push(path))
    }
    render() {
        return (
            <Particle>
                <div className='logo-c'>
                    <img className='logo' src='/logo-v.png' />
                </div>
                <div className='cta-c'>
                    <div className='cta'>
                        <h4>Ethereum dApp</h4>
                        <div className='btn-c'>
                            <div className='bootstrap-btn'>
                                <Button style={{ cursor: 'pointer' }} color='info'
                                    onClick={() => {
                                        this.launchDemo('/bootstrap');
                                    }}
                                >Bootstrap</Button>
                            </div>
                            <div className='material-btn'>
                                <MuiThemeProvider muiTheme={lightMuiTheme}>
                                    <RaisedButton secondary label="Material" onTouchTap={() => {
                                        this.launchDemo('/material');
                                    }} />
                                </MuiThemeProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </Particle>
        );
    }
}
