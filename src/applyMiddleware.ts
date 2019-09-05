import {compose} from './compose';
import {
    Reducer,
} from './type'


export  function applyMiddleware(...middlewares) {
    return (createStore) => (reducer:Reducer, preloadedState?, enhancer?) => {
        const store = createStore(reducer, preloadedState, enhancer)
        let dispatch = store.dispatch
        let chain:any[] = []

        const middlewareAPI = {
            getState: store.getState,
            dispatch: (action) => dispatch(action)
        }
        chain = middlewares.map(middleware => middleware(middlewareAPI))
        dispatch = compose(...chain)(store.dispatch)

        return {
            ...store,
            dispatch
        }
    }
}
