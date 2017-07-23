




const handlers = {

  ['TRANSMUTE_WEB3_ACCOUNTS_RECEIVED']: (state: any, action: any) => {
    let defaultAddress = action.payload[0]
    return {
      ...state,
      defaultAddress: defaultAddress,
      addresses: action.payload,
    }
  },
  ['TRANSMUTE_FACTORY_RECEIVED']: (state: any, action: any) => {
    return {
      ...state,
      [action.payload.readModelType]: action.payload
    }
  },
  ['TRANSMUTE_EVENTSTORE_EVENTS_RECEIEVED']: (state: any, action: any) => {
    return {
      ...state,
      ['events']: action.payload.events
    }
  },

  ['DEMO_LOAD']: (state: any, action: any) => {
    return {
      ...state,
      ['selectedContract']: action.payload.contractAddress,
      ['demoView']: action.payload.view
    }
  },
  ['RECORD_EVENT_DIALOG_UPDATE']: (state: any, action: any) => {
    // console.log('payload: ', action.payload)
    return {
      ...state,
      ['activeDialog']: action.payload,
    }
  },

  ['USE_ADVANCED_DEMO']: (state: any, action: any) => {
    return {
      ...state,
      ['advancedDemo']: action.payload,
    }
  },
  
}

export const reducer = (state: any, action: any) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }
  return {
    advancedDemo: localStorage.getItem('demoMode') === 'advanced' || false,
    demoView: 'factory',
    defaultAddress: null,
    addresses: null,
    ...state
  }
}

