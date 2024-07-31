import axios from 'axios';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';

console.log("REDUX LEARNING");

// action-types.ts

export const INCREMENT = '[Counter increment]';
export const RESET = '[Counter reset]';
export const INIT_PRODUCTS = '[Products initProducts]'


type incrementAction = { type: '[Counter increment]'; value: number};
type resetAction = {type: '[Counter reset]'}
type initProductsAction = {type: '[Products initProducts]', products: any[]}
type CounterActions = incrementAction | resetAction;

// actions.ts
// action creator - helper function that create action object

// return action object {type: INCREMENT..}
export const increment = (value : number) => ({type: INCREMENT, value})
export const reset = () => ({type: RESET})

export const initProducts = (products: any[]) => ({type: INIT_PRODUCTS, products})

// thunk function as action
// thunk function will return function as action, instead of object as action
export function fetchProducts() {
    // we return function as an action
    // WE dispatch below function as action to redux, thunk call the below func
    return async function (dispatch: any, getState: any) {
        // you write all async code
        // timer, ajax/api and dispatch to reducer
        console.log("THUNK async function called by thunk middleware")

        try {
            const response = await axios.get("http://localhost:7070/api/products");
            const products = response.data
            console.log("products", products)
            const action = initProducts(products)
            console.log("DISPATCH INIT PRODUCTS", action)
            dispatch(action)
        // if we get the data, 2xx
        }catch(error) {
            // if any error
        }
        
    }
}


// counterReducer.ts
// state as number
const INITIAL_VALUE = 0
export const counterReducer = (state = INITIAL_VALUE, action:CounterActions) => {
    console.log("Counter reduced called ", state, action)
    switch(action.type) {
        case INCREMENT: {
            return state + action.value
        }
        case RESET: {
            return 0
        }
        default:
            return state;
    }
}

// loggerMiddleware.ts
export function loggerMiddleware(store : any) {
    // called only once, to give us store reference
    console.log("loggerMiddleware INIT")
    return function (next: any) {
        // called only once, to give callback to 
        // forward action to next middleware/reducers
        console.log("loggerMiddleware next");
        
        return function (action: any) {
            // called for every dispatch
            console.log("LOGGER action", action)
           const r = next(action) // forward action to next middleware/reducers
           return r;
        }
    }
}

// cacheMiddleware.ts
export const cacheMiddleware = (store:any) => (next: any) =>  (action: any) =>{
    console.log("cacheMiddleware")
    const r = next(action)
    const state = store.getState()
    window.localStorage.setItem("REDUX_STATE", JSON.stringify(state))
    return r;

}

//configureStore.ts

export const configureStore = () => {
    // a store need more reducers, each reducer manage its own state
    // need to use combineReducer to group reducers into one
    const rootReducer = combineReducers ({
        //state attribute name: reducerFunction
        counter: counterReducer,
        //cart: cartReducer,
        //auth: authReducer
        //....
    })

    const stateFromLocal = JSON.parse(
                    window.localStorage.getItem("REDUX_STATE") as string)
    

    console.log("LOCAL STATE FROM STORAGE ", stateFromLocal)

    const DEFAULT_STATE = { counter: 0}

    const state = stateFromLocal? stateFromLocal: DEFAULT_STATE;

    console.log("creating store")
    const store = createStore(rootReducer, state,
                              applyMiddleware(loggerMiddleware, cacheMiddleware, thunk as any) as any
    )
    console.log("Store created")
    return store;
}

const store = configureStore()

// demo.ts

let state = store.getState()

console.log("STATE ", state) // { counter: 0, ... auth: ... cart: ...}
console.log("Counter value ", state.counter)

// susbcribe will be called after store value updated
// dispatch => call all reducers ==> update store value ==> subscribe callback
store.subscribe ( () => {
    console.log("SUBSCRIBE CALLED, store STATE ", store.getState())
})

let action = increment(10) // action is an object {type: 'INCREMENT',...}
console.log("ACTION ", action) 
console.log("ACTION Object type", typeof action)

//dispatch will call the reducers, update store value to 10
console.log("DISPATCH ACTION", action)
store.dispatch(action as incrementAction) // dispatching action which is object type
console.log("DISPATCH DONE")

console.log("UPDATED STATE ", store.getState())


store.dispatch(increment(5) as incrementAction)
console.log("UPDATED STATE ", store.getState())

// store.dispatch (reset() as resetAction)
// console.log("UPDATED STATE ", store.getState())



const thunkFetchProductsActionFunc = fetchProducts()
console.log("action thunk type is ", typeof thunkFetchProductsActionFunc)
console.log("Action func", thunkFetchProductsActionFunc)

//dispatch thunk func to store, it will crash without thunk middleware
store.dispatch(thunkFetchProductsActionFunc as any)