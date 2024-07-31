import React, {useState} from 'react';
import Counter from './components/Counter';
import Cart from './cart/pages/Cart';

function App () {
    console.log("App render")

    const [flag, setFlag] = useState(true)
    // below code create virtual dom whenever function called
    return (
        <div>
            <h2>React app</h2>
            <button onClick={ () => setFlag(!flag) }>
                  { flag? "Hide": "Show"  }
            </button>
            {flag && <Counter />}
            <Cart />
            {/* <Counter /> */}
        </div>
    )

}

export default App;