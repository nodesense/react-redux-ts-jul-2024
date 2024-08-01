import React, {useState} from 'react';
import Counter from './components/Counter';
import Cart from './cart/pages/Cart';
import { LanguageContext, Tamil, English} from './contexts/Language';
import Checkout from './cart/pages/Checkout';
import Products from './cart/pages/Products';

import ReduxCounter from './containers/ReduxCounter';
import ReduxProducts from './cart/pages/ReduxProducts';

import {BrowserRouter as Router,
        Switch,
        Route,
        Link,
        NavLink
} from 'react-router-dom';

const Home = () => (
    <div>
        <h2>Home page</h2>
    </div>
)

const NotFound = () => (
    <div>
        <h2>Page not found</h2>
    </div>
)

function App () {
    console.log("App render")

    const [flag, setFlag] = useState(true)
    const [lang, setLang] = useState(English)
    // below code create virtual dom whenever function called
    return (
        <Router>
        <div>
            <LanguageContext.Provider value={lang}>
                <h2>React app</h2>
                <button onClick= { () => setLang(English)}>En</button>
                <button onClick= { () => setLang(Tamil)}>Ta</button>
                <hr />
                
                <Switch>
                {/* exact is mean exact match, by default it does starts with match */}
                <Route path="/" exact>
                    <Home />
                </Route>

                <Route path="/products">
                    <Products />
                </Route>

                <Route path="/redux-products">
                    <ReduxProducts />
                </Route>

                <Route path="/checkout">
                    <Checkout />
                </Route>


                <Route path="/counter">
                    <Counter />
                </Route>
                
                
                <Route path="/redux-counter">
                    <ReduxCounter />
                </Route>

                <Route path="/cart">
                    <Cart />
                </Route>

                {/* * means match all path ie wildcard */}
                <Route path="*">
                    <NotFound />
                </Route>

                </Switch>
                  
            </LanguageContext.Provider>

            
        </div>
        </Router>
    )

}

export default App;