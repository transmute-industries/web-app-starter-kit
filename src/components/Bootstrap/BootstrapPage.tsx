import * as React from 'react';

import UPortRegister from './UPortRegister/UPortRegister';


import './BootstrapPage.css';

export default class BootstrapPage extends React.Component<any, any> {
  render() {
    return (
      <div className='bootstrap-demo'>
    
        <UPortRegister />
      </div>
    );
  }
}
