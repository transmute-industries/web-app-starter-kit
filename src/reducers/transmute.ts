




const handlers = {

  ['TRANSMUTE_WEB3_ACCOUNTS_RECEIVED']: (state: any, action: any) => {
    let defaultAddress = action.payload[0]
    return {
      ...state,
      defaultAddress: defaultAddress,
      addresses: action.payload,
    }
  }

  //   ['FACTORY_EVENT_STORE_ADDRESSES_RECEIVED']: (state: any, action: any) => {
  //     if (action.payload.length === 0) {
  //       return state
  //     }
  //     let defaultEventStoreAddress = action.payload[0]
  //     let step = state.step + 1
  //     return Object.assign({}, state, {
  //       step: step,
  //       eventStoreAddress: defaultEventStoreAddress
  //     })
  //   },

  //   ['EVENT_STORE_ADDRESS_RECEIVED']: (state: any, action: any) => {
  //     if (action.payload.length === 0) {
  //       return state
  //     }
  //     let defaultEventStoreAddress = action.payload
  //     let step = state.step + 1
  //     return Object.assign({}, state, {
  //       step: step,
  //       eventStoreAddress: defaultEventStoreAddress
  //     })
  //   },

  //   ['EVENT_STORE_RECEIVED']: (state: any, action: any) => {
  //     let step = state.step + 1
  //     return Object.assign({}, state, {
  //       EventStore: action.payload
  //     })
  //   },

  //   ['EVENT_STORE_UPDATED']: (state: any, action: any) => {
  //     let step = state.step + 1
  //     return Object.assign({}, state, {
  //       step: step,
  //       EventStore: action.payload
  //     })
  //   },

  //   ['FACTORY_EVENT_STORES_RECEIVED']: (state: any, action: any) => {
  //     return Object.assign({}, state, {
  //       factoryEventStores: action.payload,
  //       factoryLoaded: true
  //     })
  //   },

  //   ['DEMO_STEP']: (state: any, action: any) => {
  //     return Object.assign({}, state, {
  //       step: action.payload,
  //     })
  //   },

  //   ['EVENTS_READ']: (state: any, action: any) => {
  //     return Object.assign({}, state, {
  //       transmuteEvents: action.payload,
  //       transmuteEventsLoaded: true
  //     })
  //   }

}

export const reducer = (state: any, action: any) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }
  return {
    step: 0,
    history: [
      {
        value: '👑   Transmute   👑'
      }
    ],
    defaultAddress: null,
    addresses: null,
    factoryEventStores: [],
    factoryLoaded: false,
    transmuteEvents: [],
    transmuteEventsLoaded: false,
    ...state
  }
}

