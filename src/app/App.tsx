import React, {ReactNode, Suspense, lazy, useState} from 'react';
import Counter from './components/Counter';

// must not be imported if the module is lazy loaded
// Cart, cartitem, cartlist component shall be loaded when we click the cart link
// import Cart from './cart/pages/Cart';

import { LanguageContext, Tamil, English} from './contexts/Language';
//packad as bundle.js 
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

// browser feature called import() func, not import state
// webpack shalll pack Cart and its sub-componnents in to separate bundle
//Cart code shall not be part of bundle.js
const Cart = lazy ( () => import ("./cart/pages/Cart") )

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

// place-holder to show when the lazy module is downloading...
const Loading = () => (
    <div><h2>loading module...</h2></div>
)
 

interface HeaderProps {
    children: ReactNode
}
// <Header> <h1>React</h1> </Header ==> <h1>React</h1> is known as children
// children is special property in react, react keyword
const Header = (props: HeaderProps) => {
    return (
        <div>
           {props.children}

            <NavLink to="/" >Home</NavLink>
            <NavLink to="/products" >Products</NavLink>
            <NavLink to="/redux-products" >Redux Products</NavLink>
            <NavLink to="/cart" >Cart</NavLink>
            <NavLink to="/redux-counter" >Redux Counter</NavLink>
            <NavLink to="/counter" >Counter</NavLink>

            
        </div>
    )
}

function App () {
    console.log("App render")

    const [flag, setFlag] = useState(true)
    const [lang, setLang] = useState(English)
    // below code create virtual dom whenever function called
    return (
        <Router>
        <div>
            <LanguageContext.Provider value={lang}>
                <Header >
                    {/*passed as props.children */}
                    <h2>React app</h2>
                </Header>
                
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
                    <Suspense fallback={<Loading />} >
                        <Cart />
                    </Suspense>
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