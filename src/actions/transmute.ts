
// import {UserState} from '../types/index';

import TransmuteFramework from '../transmute'


export const getFactoryReadModel = (fromAddress: string) => (dispatch: any) => {

    TransmuteFramework.EventStoreFactoryContract.deployed()
        .then((factory: any) => {
            TransmuteFramework.Factory.getFactoryReadModel(factory, fromAddress)
                .then((readModel: any) => {
                    console.log('readModel: ', readModel)
                    dispatch({
                        type: 'TRANSMUTE_FACTORY_RECEIVED',
                        payload: readModel
                    })
                })
        })
}

export const getEventStoresByOwner = (fromAddress: string) => (dispatch: any) => {
    // console.log('fromAddress: ', fromAddress)
    TransmuteFramework.EventStoreFactoryContract.deployed()
        .then((factory: any) => {
            TransmuteFramework.Factory.getAllEventStoreContractAddresses(factory, fromAddress)
                .then((contractAddresses: any) => {
                    console.log('contractAddresses: ', contractAddresses)
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
                let fromAddress = addresses[0]
                // dispatch(getEventStoresByOwner(fromAddress))
                dispatch(getFactoryReadModel(fromAddress))
            }
        })
}

export const createEventStore = (fromAddress: string) => (dispatch: any) => {
    // console.log('fromAddress: ', fromAddress)
    TransmuteFramework.EventStoreFactoryContract.deployed()
        .then((factory: any) => {
            TransmuteFramework.Factory.createEventStore(factory, fromAddress)
                .then((data: any) => {
                    // console.log('data: ', data)
                    dispatch(getEventStoresByOwner(fromAddress))
                    // dispatch({
                    //     type: 'TRANSMUTE_EVENTSTORE_OWNED_CONTRACT_ADDRESSES_RECEIEVED',
                    //     payload: contractAddresses
                    // })
                })
        })
}

export const readAllContractEvents = (
    contractAddress: string,
    fromAddress: string,
    eventIndex: number
) => (dispatch: any) => {
    // console.log('fromAddress: ', fromAddress)
    TransmuteFramework.EventStoreContract.at(contractAddress)
        .then((eventStore: any) => {
            TransmuteFramework.EventStore.readFSAs(eventStore, fromAddress, eventIndex)
                .then((events: any) => {
                    // console.log('events: ', events)
                    // dispatch(getEventStoresByOwner(fromAddress))
                    dispatch({
                        type: 'TRANSMUTE_EVENTSTORE_EVENTS_RECEIEVED',
                        payload: {
                            contractAddress: contractAddress,
                            events: events
                        }
                    })
                })
        })
}

export const writeFSA = (
    contractAddress: string,
    fromAddress: string,
    event: any
) => (dispatch: any) => {
    // console.log('fromAddress: ', fromAddress)
    TransmuteFramework.EventStoreContract.at(contractAddress)
        .then((eventStore: any) => {
            TransmuteFramework.EventStore.writeFSA(eventStore, fromAddress, event)
                .then((data: any) => {
                    console.log('data: ', data)
                    // dispatch(getEventStoresByOwner(fromAddress))
                    // dispatch({
                    //     type: 'TRANSMUTE_EVENTSTORE_OWNED_CONTRACT_ADDRESSES_RECEIEVED',
                    //     payload: contractAddresses
                    // })
                })
        })
}







