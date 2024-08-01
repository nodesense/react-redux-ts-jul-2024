import {connect} from 'react-redux';
import ReduxCounter from '../components/ReduxCounter';
import { increment, reset } from '../store'; // actions.ts
import {bindActionCreators} from 'redux';

 
// map state to props
// get data from redux store and pass to react component as props
// this function called after every dispatch, any changes to store, component
// will get updated automatically

// state = store.getState(), the state is passed automatically by container component
const mapStateToProps = (state: any) => {
    console.log("Redux counter mapStateToProps")
    // state = {counter: 10, cart: {items: [...}, auth: {login: true}....}
    // return props with value, which must go to ReduxCounter comp as props
    return {
        counter: state.counter
    }
}

// map dispatch to props
// dispatch is nothing but store.dispatch
// getState is nothing but store.getState
// mapDispatchToProps is called only once when component initially rendered
const mapDispatchToProps = (dispatch: any, getState: any) => {
    console.log("redux counter container mapDispatchToProps")
    // return props which are action/callback functions
    return {
        increment: function incr(n: number) {
            // dispatch here
            // you may write tweaks, check state value in store before dispatch
            dispatch(increment(n))
        },

        reset: () => {
            dispatch(reset())
        },
        // this automatically create action and dispatch action
        // here we can't do tweak or logic
        incrementBA: bindActionCreators(increment, dispatch)
    }
}

// react component, map state to props, map dispatch to props
// redux store, shall be obtained using react context, we should not import store
// create a container component

const ReduxCounterContainer = connect(mapStateToProps, mapDispatchToProps) 
                                                    (ReduxCounter as any);

export default ReduxCounterContainer;