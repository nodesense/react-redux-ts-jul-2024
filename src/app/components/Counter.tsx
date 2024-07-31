import React, {useState, useEffect, FC} from 'react';



function Counter () {
    console.log("counter render");

    // setCounter is a function to set value
    // counter is value
    const [counter, setCounter] = useState(0)

    // LIFE CYCLE [CREATION, UPDATION, DESTRUCTION]
    // CREATION - this effect will be called only once when component created
    // Set timer, subscription, ajax api calls
    useEffect ( () => {
        console.log("Counter created useEffect")
    }, []); // [] represent empty array, no dependent variable

    // UPDATE, called many times
    useEffect ( () => {
        console.log("Counter component update useEffect")

        return () => {
            // this portion of code shall be called when component destroyed
            console.log("Counter componnet destroyed useEffect callback on update")
        }
    }); // no dependent variables

    // DESTRUCTION caled when componennt get destroyed
    useEffect( () => {
        return () => {
            // this portion of code shall be called when component destroyed
            console.log("Counter componnet destroyed useEffect callback")
        }
    }, [])

    return (
        <div>
            <h2>Counter {counter}</h2>

            <button onClick={ () => setCounter(counter +1 )} >+1</button>
            <button onClick={ () => {}} >-1</button>
         
        </div>
    )
}

export default Counter;