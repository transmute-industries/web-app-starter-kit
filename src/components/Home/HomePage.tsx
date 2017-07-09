import * as React from 'react';

import { Particle } from '../Common/Particle/Particle'

import './HomePage.css';


export default class HomePage extends React.Component<any, any> {
    render() {
        return (

            <Particle>
                <div className='logo-c'>
                    <img className='logo' src='/logo-v.png' />
                </div>
                <div className='cta-c'>
                    <div className='cta'>
                        Bootstrap & Material
                        
                    </div>
                </div>
            </Particle>

        );
    }
}
