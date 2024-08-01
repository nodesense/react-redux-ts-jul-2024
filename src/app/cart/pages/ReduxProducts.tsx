import React, { useEffect } from "react";
// useDispatch and useSelector uses <Provider store ../> to get the store object
import {useDispatch, useSelector} from 'react-redux';
import { fetchProducts } from "../../store-toolkit";

// we use redux state without containers
const ReduxProducts = () => {
    console.log("Redux products render")

    // useEffect, when the component loading first time, dispatch to get the products
    // get loading, products from redux store

    const loading = useSelector( (state: any) => state.product.loading)
    const products = useSelector ((state: any) => state.product.products)
    const dispatch: any = useDispatch();

    // use effect during creation to fetch products from api, using thunk
    useEffect ( () => {
        // now dispatch thunk,
        console.log("redux product comp dispatching thunk")
        // dispatch thunk func, intercepted and called by middle ware
        const abort = new AbortController()
        dispatch(fetchProducts(abort.signal));
        // clean up , unmount code, cancel pending calls
        
        return () => {
            console.log("redux product unloading.")
            //FIXME: not shown in stack trace..
            abort.abort("too late response")
        }
    }, [])

    console.log ("loading, products", loading, products)

    if (loading) {
        return (
            <div>
                <h2>Loading products....</h2>
            </div>
        )
    }

    return (
        <div>
            <h2>Redux Products</h2>
            <p>PRoducts {products.length} </p>
        </div>
    )
}

export default ReduxProducts;