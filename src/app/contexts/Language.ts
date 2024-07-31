import React, {createContext} from 'react';

export const English = {
    "home": "Home",
    "cart": "Cart",
    "products": "Products",
    "checkout": "Checkout",
    "login": "Login" 
}

export const Tamil = {
    "home": "நுழைவு",
    "cart": "கார்ட்",
    "products": "பொருள்கள்",
    "checkout": "வாங்குக",
    "login": "லாகின்" 
}


export const Languages  = {
    "Tamil": Tamil,
    "English": English
}

// (English) is default value used when no provider present
export const LanguageContext = createContext(English);