const redux = require("redux")
const reduxLogger=require('redux-logger')
const thunkMiddleware=require('redux-thunk').default


const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'
const initialStore = {
    cakeCount: 10,
    iceCreamCount: 20
}

const blubberyCakeReducer = (state = initialStore, action) => {
    if (typeof action == 'undefined') {
        return {...state}
    }
    switch (action.type) {
        case BUY_CAKE:
            return {...state, cakeCount: state.cakeCount - 1}
        case BUY_ICECREAM:
            return {...state, iceCreamCount: state.iceCreamCount - 1}
        default:
            return {...state}
    }
}

const combinedReducer = redux.combineReducers({store:blubberyCakeReducer})
const applyMiddleware=redux.applyMiddleware
const logger=reduxLogger.createLogger()
const store = redux.legacy_createStore(combinedReducer,applyMiddleware(logger,thunkMiddleware))

const actionCreator = (type) => {
    if (type === 'cake') {
        return {
            type: BUY_CAKE
        }
    } else if (type === 'icecream') {
        return {
            type: BUY_ICECREAM
        }
    }
}
const unsubscribe = store.subscribe(() => {

})
console.log('initial count', store.getState())
store.dispatch(actionCreator('cake'))
store.dispatch(actionCreator('cake'))
store.dispatch(actionCreator('icecream'))

unsubscribe()
