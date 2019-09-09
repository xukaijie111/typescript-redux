import isPlainObject from 'lodash/isPlainObject'

import {
    Reducer,
    State,
    Dispatch,
    IUnSubscribe,
    ISubscribe,
    IVoidfunc,
    IAction
} from './type'


export const actionTypes = exports.ActionTypes = {
    INIT: 'typescript-redux/INIT'
}

export  default function createStore(reducer:Reducer,preloadedState?:any, enhancer?:any){
    if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
        enhancer = preloadedState
        preloadedState = undefined
    }
    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
            throw new Error('Expected the enhancer to be a function.')
        }
        return enhancer(createStore)(reducer, preloadedState)
    }
    if (typeof reducer !== 'function') {
        throw new Error('Expected the reducer to be a function.')
    }
    let currentReducer = reducer
    let currentState:State = {};
    let listeners:IVoidfunc[] = [];
    let isDispatching:boolean = false;

    function getState():State {
        return currentState
    }

    const subscribe:ISubscribe = function(listener:IVoidfunc):IUnSubscribe {
        if (typeof listener !== 'function') {
            throw new Error('Expected listener to be a function.')
        }

        let isSubscribed = true

        listeners.push(listener)

        return function unSubscribe() {
            if (!isSubscribed) {
                return
            }
            isSubscribed = false
            const index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }

    const dispatch:Dispatch = function(action:IAction):IAction {
        if (!isPlainObject(action)) {
            throw new Error(
                'Actions must be plain objects. ' +
                'Use custom middleware for async actions.'
            )
        }

        if (typeof action.type === 'undefined') {
            throw new Error(
                'Actions may not have an undefined "type" property. ' +
                'Have you misspelled a constant?'
            )
        }

        if (isDispatching) {
            throw new Error('Reducers may not dispatch actions. haved one action is doing')
        }

        try {
            isDispatching = true
            currentState = currentReducer(currentState, action)
        } finally {
            isDispatching = false
        }

        for ( const listener of  listeners) {
            listener();
        }

        return action
    }

    function replaceReducer(nextReducer:Reducer):void {
        if (typeof nextReducer !== 'function') {
            throw new Error('Expected the nextReducer to be a function.')
        }

        currentReducer = nextReducer
        dispatch({ type: actionTypes.INIT })
    }

    dispatch({ type: actionTypes.INIT }) // 初始化一次state

    return {
        getState,
        subscribe,
        dispatch,
        replaceReducer
    }


}
