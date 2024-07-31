# code share

https://demo.firepad.io/#emeXo71V5n

```
 git add .

git push -u origin main


 ```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).




interface Props {
  foo?: string,
  bar?: string,
}


const defaultProps = {
  foo: 'hello',
  bar: 'world',
}

const Component: FC<Props> = (props) => {
  const propsWithDefaults = {
    ...defaultProps,
    ...props,
  }

  const { foo, bar } = propsWithDefaults;

  console.log(foo.toUpperCase()) // Allowed, because it's definitely a string
}




interface CartItem {
    price: number;
    id: number;
    name: string;
    qty: number;
}

interface Props {
    item: CartItem
    children?: React.ReactNode
}

const Cart: React.FC<Props> = (props)  => {
    return (
        <>
        <h2>{props.item.id}</h2>
        <h2>{props.item.name}</h2>
        {props.children}
        </>
    )
}


const Cart2: React.FC<Props> = ({item: {id, name}})    => {
    return (
        <>
        <h2>{id}</h2>
        <h2>{name}</h2>
        </>
    )
}

const item : CartItem = {
id: 1,
name: 'hi',
price: 13,
qty: 5
}

   
            <Cart item={item} >
                <h1>Within CArt</h1>
                </Cart>
            <Cart2 item={item} />



OOP

class Calculator {
  sum: int = 0; // state , local state

  // write unit test case for sum, 
  add(n: Int) {
    // sum is mutable
    this.sum += n // Business logic
    return this.sum
  }
}

calc = new CAlculator()

calc.add(10) // 10
calc.add(10) // 20
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)
calc.add(5)


---

functional
// pure function
// given same argument, always expect same output - predictable
function add(sum, n) {
  return sum + n
}

function addItem(items, item) {
  return [...items, item]
}

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30

add(10, 20) // 30
