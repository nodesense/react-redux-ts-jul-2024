import React, {memo} from 'react';
import { CartItemModel } from '../models/CartItemModel';
import CartItem from './CartItem';

interface Props {
    items: CartItemModel[],
    dispatch: any; //dipatch is a callback function passed from cart to cart list

    updateItemInCart: any;
}

//destructring in function declaration
const CartList: React.FC<Props> = ( {items, dispatch, updateItemInCart} )=>{
    //const items = props.items
    console.log("CartList render");
    return (
        <table>
            <tr>
                <td>Name</td>
                <td>Price</td>
                <td>Qty</td>
                <td>Amount</td>
                <td>Update</td>
                <td>Delete</td>
            </tr>
            <tbody>
                {
                    items.map (item => (<CartItem item={item} 
                                         key={item.id}
                                         updateItemInCart = {updateItemInCart}
                                         dispatch={dispatch} />))
                }
            </tbody>
        </table>
    )
}

export default memo(CartList);