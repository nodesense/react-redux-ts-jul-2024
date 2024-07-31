import React, {useEffect, useState} from 'react';

import axios from 'axios';

const Products = () => {
    console.log ("Products render")
    const [products, setProducts] = useState([])

    useEffect (() => {
        console.log("fetching products from server");
        // async / ajax call
        // promise using es7
        const controller = new AbortController()
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:7070/delayed/api/products",
                    {signal: controller.signal}
                );
                const products = response.data
                console.log("products", products)
            // if we get the data, 2xx
            }catch(error) {
                // if any error
            }
        }

        fetchProducts()
        return () => {
            // called when component unmount/destruction
            controller.abort()
        }
    }, [])

    return (
        <div>
            <h2> Products </h2>
        </div>
    )
}

export default Products;