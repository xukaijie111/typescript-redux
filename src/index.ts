import createStore from './createStore';

import {combineReducers} from './combineReducers';

import {bindActionCreators} from './bindActionCreators'

function sum(a,b){
    return a + b;
}

console.log(createStore,combineReducers,bindActionCreators,sum)

module.exports = {
    createStore,
    combineReducers,
    bindActionCreators,
    sum
}
