import React, {useState} from 'react';
import Counter from './components/Counter';
import Cart from './cart/pages/Cart';
import { LanguageContext, Tamil, English} from './contexts/Language';
import Checkout from './cart/pages/Checkout';
import Products from './cart/pages/Products';

function App () {
    console.log("App render")

    const [flag, setFlag] = useState(true)
    const [lang, setLang] = useState(English)
    // below code create virtual dom whenever function called
    return (
        <div>
            <LanguageContext.Provider value={lang}>
                <h2>React app</h2>
                
                <button onClick={ () => setFlag(!flag) }>
                    { flag? "Hide": "Show"  }
                </button>

                {flag && <Products /> }

                <Checkout />

                <button onClick= { () => setLang(English)}>En</button>
                <button onClick= { () => setLang(Tamil)}>Ta</button>
                
               
                {flag && <Counter />}
                
                {flag && <Cart /> }
                
                {/* <Counter /> */}
            </LanguageContext.Provider>

            
        </div>
    )

}

export default App;