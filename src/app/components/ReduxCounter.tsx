import React from 'react';

// no import of store, no dispatch, no getState, no subscribe

interface Props {
    counter: number;
    increment: (n: number) => {};
    incrementBA: (n: number) => {};
    reset: () => {}
}

function ReduxCounter ({counter, increment, reset, incrementBA}: Props) {
    console.log("counter render");
    
    return (
        <div>
            <h2>Redux Counter {counter}</h2>

            <button onClick={ () => increment(1)} >+1</button>
            <button onClick={ () => incrementBA(2)} >+2</button>
            <button onClick={ () => reset()} >Reset</button>
         
        </div>
    )
}

export default ReduxCounter;