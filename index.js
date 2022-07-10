const redux = require("redux");

const BUY_CAKE = 'BUY_CAKE'
const initialStore = {
    cakeCount: 10,
    cakeType: 'blueberry'
}

const blubberyCakeReducer = (state = initialStore, action) => {
    if (typeof action == 'undefined') {
        return {...state}
    }
    switch (action.type) {
        case BUY_CAKE:
            return {...state, cakeCount: state.cakeCount - 1}
        default:
            return {...state}
    }
}

const appleCakeReducer = (state = {cakeCount: 15, cakeType: 'apple'}, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {...state, cakeCount: state.cakeCount - 1}
        default:
            return {...state}
    }
}
const combinedReducer = redux.combineReducers({appleCakeReducer, blubberyCakeReducer})
const store = redux.legacy_createStore(combinedReducer)

const actionCreator = () => {
    return {
        type: BUY_CAKE
    }
}
const unsubscribe = store.subscribe(() => {
    console.log('remaining count:', store.getState())
})
console.log('initial count',store.getState())
store.dispatch(actionCreator())
store.dispatch(actionCreator())
store.dispatch(actionCreator())

unsubscribe()
