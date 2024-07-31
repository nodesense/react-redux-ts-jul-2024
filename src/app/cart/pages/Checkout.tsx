import React, {useState, useRef, ChangeEvent, useEffect} from 'react';

const Checkout = () => {
    console.log("Checkout render")
    // first name
    const [firstName, setFirstName] = useState("")
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("on value change", e)
        // e.target // target is REAL DOM reference
        const {value} = e.target as HTMLInputElement
        console.log("Value is ", value)
        setFirstName(value) // calls re-render
    }

    const firstNameRef = useRef<HTMLInputElement>(null)
    // .current reference to real dom ie input element
    // this .current not avaialbel during creation time
    // can be accessible with useEffect
    console.log("firstNameRef Ref", firstNameRef.current)

    //to set focus, only one time during page load/component creation
    useEffect ( () => {
        console.log("firstNameRef Ref on useEffect", 
                    firstNameRef.current)
                    //FIXME:
        // const inputElemenet: HTMLInputElement =  firstNameRef.current as unknown as HTMLInputElement;

        // inputElemenet.focus()
        // ? state that current could be null or input element reference
        firstNameRef.current?.focus()

    }, []) // one time, creation time

    return (
        <div>
            <h2>Checkout</h2>
            First name 
            <input name="firstName" 
                    value={firstName} 
                    onChange={onChange}
                    ref = {firstNameRef}
                    />
        </div>
    )
}

export default Checkout;