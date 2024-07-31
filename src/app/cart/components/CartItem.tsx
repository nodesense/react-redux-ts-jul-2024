import React, {memo} from 'react';
import { CartItemModel } from '../models/CartItemModel';

interface Props {
    item: CartItemModel;
    dispatch: any;
    updateItemInCart: any;
}

const CartItem: React.FC<Props> = (props) => {
    console.log("CartItem render ", props.item)

    // destructruing
    // const item = props.item
    const {item, dispatch, updateItemInCart} = props;
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.qty}</td>
            <td>{item.price * item.qty}</td>
            <td> <button onClick={ () => updateItemInCart(item.id, item.qty + 1)}> +1 </button> </td>
            <td> <button onClick={ () => dispatch({type:'REMOVE_ITEM', id:item.id})  }> X </button> </td>
        </tr>
    )
}

export default memo(CartItem);