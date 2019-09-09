import {
    IReducersMapObject,
    Reducer,
    State,
    IAction
} from './type'

let _createStore = require('./createStore');

function assertReducerShape(reducers:IReducersMapObject):void {
    Object.keys(reducers).forEach(function (key) {
        let reducer = reducers[key];
        let initialState = reducer(undefined, { type: _createStore.actionTypes.INIT });

        if (typeof initialState === 'undefined') {
            throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
        }

        let type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
        if (typeof reducer(undefined, { type: type }) === 'undefined') {
            throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.actionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
        }
    });
}

function getUndefinedStateErrorMessage(key, action) {
    const actionType = action && action.type;
    const actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

    return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

export function combineReducers(reducers:IReducersMapObject):Reducer{

    let reducerKeys:string[] = Object.keys(reducers);
    let finalReducers = {};
    for (let key of reducerKeys) {
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }
    let finalReducerKeys = Object.keys(finalReducers);

    let unexpectedKeyCache:any = void 0;
    if (process.env.NODE_ENV !== 'production') {
        unexpectedKeyCache = {};
    }

    let shapeAssertionError:any = void 0;
    try {
        assertReducerShape(finalReducers);
    } catch (e) {
        shapeAssertionError = e;
    }

    return function combination(state:State,action:IAction):State {
        if (shapeAssertionError) {
            throw shapeAssertionError;
        }
        let hasChanged = false;
        let nextState = {};
        for (let _key of  finalReducerKeys) {
            const reducer = finalReducers[_key];
            const previousStateForKey:any = state[_key] ? state[_key] : undefined;
            const nextStateForKey = reducer(previousStateForKey, action);
            if (typeof nextStateForKey === 'undefined') {
                const errorMessage = getUndefinedStateErrorMessage(_key, action);
                throw new Error(errorMessage);
            }
            nextState[_key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? nextState : state;
    };
}