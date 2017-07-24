
import TransmuteFramework from '../transmute'
import * as _ from 'lodash';

let EventStoreContract = TransmuteFramework.EventStoreContract
let { getCachedReadModel } = TransmuteFramework.ReadModel

import {
    reducer as patientSummaryReducer,
    readModel as patientSummaryReadModel
} from '../components/Transmute/Healthcare/PatientSummaryCard/PatientSummaryReducer'

export const getFactoryReadModel = (fromAddress: string) => (dispatch: any) => {
    TransmuteFramework.EventStoreFactoryContract.deployed()
        .then((factory: any) => {
            TransmuteFramework.Factory.getFactoryReadModel(factory, fromAddress)
                .then((readModel: any) => {
                    dispatch({
                        type: 'TRANSMUTE_FACTORY_RECEIVED',
                        payload: readModel
                    })
                })
        })
}

export const getAccounts = () => (dispatch: any) => {
    TransmuteFramework.web3.eth
        .getAccounts((err: any, addresses: string[]) => {
            if (err) { throw err }
            dispatch({
                type: 'TRANSMUTE_WEB3_ACCOUNTS_RECEIVED',
                payload: addresses
            })
            if (addresses.length) {
                let fromAddress = addresses[0]
                dispatch(getFactoryReadModel(fromAddress))
            }
        })
}

export const createEventStore = (fromAddress: string) => (dispatch: any) => {
    TransmuteFramework.EventStoreFactoryContract.deployed()
        .then((factory: any) => {
            TransmuteFramework.Factory.createEventStore(factory, fromAddress)
                .then((data: any) => {
                    dispatch(getFactoryReadModel(fromAddress))
                    dispatch(updateSelectedContract( data.events[0].payload.address, fromAddress))
                })
        })
}

export const readAllContractEvents = (
    contractAddress: string,
    fromAddress: string,
    eventIndex: number
) => (dispatch: any) => {
    TransmuteFramework.EventStoreContract.at(contractAddress)
        .then((eventStore: any) => {
            TransmuteFramework.EventStore.readFSAs(eventStore, fromAddress, eventIndex)
                .then((events: any) => {
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
    TransmuteFramework.EventStoreContract.at(contractAddress)
        .then((eventStore: any) => {
            TransmuteFramework.EventStore.writeFSA(eventStore, fromAddress, event)
                .then((data: any) => {
                    console.log('wrote fsa (converted): ', data)
                    dispatch(readAllContractEvents(contractAddress, fromAddress, 0))
                    dispatch(loadPatientSummaryReadModel(contractAddress, fromAddress))
                })
        })
}

export const setDemoMode = (
    demoMode: string,
) => (dispatch: any) => {
    localStorage.setItem('demoMode', demoMode)
    dispatch({
        type: 'USE_ADVANCED_DEMO',
        payload: demoMode === 'advanced'
    })
}

export const updatePatientSummary = (
    readModel: any,
) => (dispatch: any) => {
    localStorage.setItem('patientSummary', JSON.stringify(readModel))
    dispatch({
        type: 'PATIENT_SUMMARY_UPDATED',
        payload: readModel
    })
}

const updateLocalStorage = (formModel: any) => {
  _.forEach(formModel, (v: any, k: any) => {
    localStorage.setItem(k, v)
  })
}

export const updateWeb3Settings = (formModel: any) => (dispatch: any) => {
  updateLocalStorage(formModel)
  window.location.href = window.location.href
  dispatch({
    type: 'WEB3_SETTINGS_UPDATED',
    payload: formModel
  })
}

export const updateSelectedContract = (
    address: any,
    fromAddress: string
) => (dispatch: any) => {
    localStorage.setItem('selectedContract', address)
    dispatch({
        type: 'EVENTSTORE_ADDRESS_UPDATED',
        payload: address
    })
    dispatch(readAllContractEvents(address, fromAddress, 0))
    dispatch(loadPatientSummaryReadModel(address, fromAddress))
}

export const loadPatientSummaryReadModel = (
    selectedContract: any,
    fromAddress: string
) => async (dispatch: any) => {

    let eventStore = await EventStoreContract.at(selectedContract)
    let updatedReadModel = await getCachedReadModel(eventStore, fromAddress, patientSummaryReadModel, patientSummaryReducer)
    dispatch(updatePatientSummary(updatedReadModel.model))
        
}



// export const getEventStoresByOwner = (fromAddress: string) => (dispatch: any) => {
//     TransmuteFramework.EventStoreFactoryContract.deployed()
//         .then((factory: any) => {
//             TransmuteFramework.Factory.getAllEventStoreContractAddresses(factory, fromAddress)
//                 .then((contractAddresses: any) => {
//                     console.log('contractAddresses: ', contractAddresses)
//                     dispatch({
//                         type: 'TRANSMUTE_EVENTSTORE_OWNED_CONTRACT_ADDRESSES_RECEIEVED',
//                         payload: contractAddresses
//                     })
//                 })
//         })
// }
