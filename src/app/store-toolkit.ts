// store-toolkit.ts
import axios from 'axios';
import {combineReducers, createStore, 
        applyMiddleware, bindActionCreators} from 'redux';
import {thunk} from 'redux-thunk';

import { createSlice, Tuple, PayloadAction, configureStore  } from '@reduxjs/toolkit'


interface ProductInitialState {
    products: any[];
    loading: boolean
}

const INITIAL_STATE: ProductInitialState = {
    products: [],
    loading: false
}

// redux toolkit - action constant/types, action creators, and reducers
const productSlice = createSlice ({
    name: 'Products',
    initialState: INITIAL_STATE, // type is assigned here
    reducers: {
        // action type shall be Products/initProducts
        initProducts(state, action: PayloadAction<any[]>) {
            // immutable internally
          state.products = action.payload;
        },
        initLoading(state, action: PayloadAction<boolean>) {
          state.loading = action.payload;
        },
      },
})

console.log("REDUX LEARNING");

const {initLoading, initProducts} = productSlice.actions;
// create a wrapper reducer functions, that calls slices internally
// now we avoid writing reducers with toolkit
const productReducer = productSlice.reducer; // automatically created with toolkit

console.log("toolkit initLoading action func", initLoading)
console.log("toolkit initLoading action type", initLoading.type)

// actionFunc.type shall be your action-types.ts constants
// create action
const initAction = initLoading(true) // create actions
console.log ("Init action using toolkit ", initAction)

// action-types.ts

export const INCREMENT = '[Counter increment]';
export const RESET = '[Counter reset]';
// export const INIT_PRODUCTS = '[Products initProducts]' // now part of slice


type incrementAction = { type: '[Counter increment]'; value: number};
type resetAction = {type: '[Counter reset]'}
// part of slice
// type initProductsAction = {type: '[Products initProducts]', products: any[]}
type CounterActions = incrementAction | resetAction;

// actions.ts
// action creator - helper function that create action object

// return action object {type: INCREMENT..}
export const increment = (value : number) => ({type: INCREMENT, value})
export const reset = () => ({type: RESET})

// part of slice
//export const initProducts = (products: any[]) => ({type: INIT_PRODUCTS, products})

// thunk function as action
// thunk function will return function as action, instead of object as action
export function fetchProducts(signal: any = undefined) { //signal is from abort controller
    // we return function as an action
    // WE dispatch below function as action to redux, thunk call the below func
    return async function (dispatch: any, getState: any) {
        // you write all async code
        // timer, ajax/api and dispatch to reducer
        console.log("THUNK async function called by thunk middleware")

        try {
            dispatch(initLoading(true)) // part of slice
            const response = await axios.get("http://localhost:7070/delayed/api/products", {signal});
            const products = response.data
            console.log("products", products)
            const action = initProducts(products) // part of slice
            console.log("DISPATCH INIT PRODUCTS", action)
            dispatch(action)
            dispatch(initLoading(false))
        // if we get the data, 2xx
        }catch(error) {
            // if any error
            // todo: initError dispatch (initError(...))
            dispatch(initLoading(false))
            console.error("Error while making api call", error)
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
// ...

// from redux-toolkit
interface State {
    counter: number;
    product: { products: any[], loading: boolean}
}


const stateFromLocal = JSON.parse(
    window.localStorage.getItem("REDUX_STATE") as string)


//rehydrate state/preload state from local storage
const initialState:State = stateFromLocal ? stateFromLocal:  {
                                counter: 0,
                                product: {products: [], loading: false}
                            }

const store = configureStore({
    reducer: { // similar to combine reducer argument
        // stateName: reducer Func
        counter: counterReducer as any, // non slice reducer/classical redux reducer
        product: productReducer
    },
    preloadedState: initialState,
    middleware: () => new Tuple(loggerMiddleware, cacheMiddleware, thunk) as any,
})
export default store;

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

// bindActionCreators: create a wrapper function that calls action creator
// and dispatch the action to store.. 
const incrementDispatch = bindActionCreators(increment, store.dispatch);
console.log("Dispatch using bind action creators");
incrementDispatch(2) // the value 2 shall be passed to increment action creator
                     // action shall be dispatched to reducers


// store.dispatch (reset() as resetAction)
// console.log("UPDATED STATE ", store.getState())



const thunkFetchProductsActionFunc = fetchProducts()
console.log("action thunk type is ", typeof thunkFetchProductsActionFunc)
console.log("Action func", thunkFetchProductsActionFunc)

//dispatch thunk func to store, it will crash without thunk middleware
store.dispatch(thunkFetchProductsActionFunc as any)