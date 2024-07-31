import React, {useReducer, useState, useCallback} from 'react';
import { CartItemModel } from '../models/CartItemModel';
import { CartListModel } from '../models/CartListModel';
import CartList from '../components/CartList';
import { LanguageContext } from '../../contexts/Language';

// useState for simple get/set
// useReducer for complex logic

interface CartAction {
    type: string;
    item?: CartItemModel; // ? represent optional
    id?: number;
    qty?: number;
}

//Type is an alias
// interface is a contract

type AddItem = { type: 'ADD_ITEM'; item: CartItemModel};
type RemoveItem = { type: 'REMOVE_ITEM', id: number };
type UpdateItem = {type: 'UPDATE_ITEM', id: number, qty: number}
type EmptyCart = {type: 'EMPTY_CART'}
// | union type
type CartActions = AddItem | RemoveItem | UpdateItem | EmptyCart;


const INITIAL_STATE: CartListModel = {
    items: [ 
        new CartItemModel(1, "test", 1, 100)
    ],
    amount: 0,
    totalItems: 0
}
//TODO
const calculate = (items: any[]) => {
    let amount = 0;
    let totalItems = 0;
    for (let item of items) {
        amount += item.price * item.qty
        totalItems += item.qty
    }

    return {
            amount, // amount: amount
            totalItems // totalItems: totalItems
    } 
    
}

function cartReducer(state: CartListModel, action: CartActions): CartListModel {
    console.log("cartReducer called ", state, action)

    switch(action.type) {
        case "ADD_ITEM": {
            const items: CartItemModel []  = [...state.items, action.item]

            const {amount, totalItems} = calculate(items)
            return {items, amount, totalItems}
        }

        case "REMOVE_ITEM": {
            const items = state.items.filter (item => item.id != action.id)
            return {items, ...calculate(items)}
        }

        // case "UPDATE_ITEM": {
        //     // FIXME
        //     return {items: [], amount: 0, totalItems: 0}
        // }

        //TODO: RESET cart

        default: return state;
    }
}


function addItem() {
    const id = Math.ceil(Math.random() * 100000)
    return new CartItemModel (
        id, 
        `Generated ${id}`,
        1,
        Math.ceil(Math.random() * 100)
    )
}

const Cart = () => {
    console.log("Cart Render")
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const [flag, setFlag] = useState(true)

    const addItemToCart = () => {
        const item = addItem()
        // dispatch will call reducer
        dispatch({type: "ADD_ITEM", item})
    }

    // whenever cart is re-rendered, this fucntion is created
    // new reference of updateItemInCart shall be passed to cart list and cart item
    // const updateItemInCart = (id: number, qty: number) => {
    //     console.log("updateItem in Cart called", id, qty)
    //     dispatch({type: "UPDATE_ITEM", id, qty}) 
    // }

     
    // useCallback remember the first reference of the function between re-render
    // only the first fucnction ref passed to child component as props
     const updateItemInCart = useCallback ( (id: number, qty: number) => {
        console.log("updateItem in Cart called", id, qty)
        dispatch({type: "UPDATE_ITEM", id, qty}) 
    }, [])

    return (
        <div>
            <h2>Cart</h2>
            
            <button onClick={ () => setFlag(!flag)}>Flag</button>

            <button onClick= { () => addItemToCart()}>
                Add Item
            </button>
            <CartList items={state.items} dispatch={dispatch} 
                                          updateItemInCart={updateItemInCart} />
        
            {/* consuming context value in react component */}
            <LanguageContext.Consumer>
                {
                    (lang) => (
                        <button >  {lang.checkout} </button>
                    )
                    
                }
            </LanguageContext.Consumer>

        </div>
    )
}

export default Cart;