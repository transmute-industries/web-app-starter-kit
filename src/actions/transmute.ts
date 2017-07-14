
// import {UserState} from '../types/index';

import TransmuteFramework from '../transmute'

export const getEventStoresByOwner = (ownerAddress: string) => (dispatch: any) => {
    // console.log('ownerAddress: ', ownerAddress)
    TransmuteFramework.EventStoreFactoryContract.deployed()
        .then((factory: any) => {
            TransmuteFramework.Factory.getAllEventStoreContractAddresses(factory, ownerAddress)
                .then((contractAddresses: any) => {
                    // console.log('contractAddresses: ', contractAddresses)
                    dispatch({
                        type: 'TRANSMUTE_EVENTSTORE_OWNED_CONTRACT_ADDRESSES_RECEIEVED',
                        payload: contractAddresses
                    })
                })
        })
}

export const getAccounts = () => (dispatch: any) => {
    TransmuteFramework.web3.eth
        .getAccounts((err: any, addresses: string[]) => {
            if (err) { throw err }
            // console.log(addresses)
            dispatch({
                type: 'TRANSMUTE_WEB3_ACCOUNTS_RECEIVED',
                payload: addresses
            })
            if (addresses.length) {
                dispatch(getEventStoresByOwner(addresses[0]))
            }
        })
}

export const createEventStore = (ownerAddress: string) => (dispatch: any) => {
    // console.log('ownerAddress: ', ownerAddress)
    TransmuteFramework.EventStoreFactoryContract.deployed()
        .then((factory: any) => {
            TransmuteFramework.Factory.createEventStore(factory, ownerAddress)
                .then((data: any) => {
                    console.log('data: ', data)
                    // dispatch({
                    //     type: 'TRANSMUTE_EVENTSTORE_OWNED_CONTRACT_ADDRESSES_RECEIEVED',
                    //     payload: contractAddresses
                    // })
                })
        })
}

