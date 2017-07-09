
// import { Connect } from 'uport-connect'

const { Connect } = require('uport-connect');

// var { Connect } = require('uport-connect')

let uport = new Connect('TransmuteIndustries')

import * as React from 'react';

// import { Button } from 'reactstrap';

import './UPortRegister.css';

import { Card, Button } from 'reactstrap';


export default class UPortRegister extends React.Component<any, any> {

    login() {
        uport.requestCredentials()
            .then((credentials: any) => {
                console.log(credentials)
            })

        // let web3 = uport.getWeb3()

        // web3.eth.getAccounts((error: any, accounts: any) => {
        //     console.log(accounts)
        // })
    }

    render() {
        return (
            <div className='bs-register'>
                <Card block className="text-center">
                    <div className='bs-av-c'>
                        <img src="/logo-v-c.png" width={300} />
                    </div>
                    <div>
                    <Button style={{ cursor: 'pointer' }} color="info" onClick={() => {
                        this.login();
                    }} >Login</Button>
                     </div>
                </Card>
            </div>
        );
    }
}

