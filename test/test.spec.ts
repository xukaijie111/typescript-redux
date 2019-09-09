
import {
    sum,
    createStore,
    combineReducers,
    bindActionCreators,
} from '../src/index'

const initialState = {
    count:2
}

let reducer1 = function (state = initialState,action) {
    switch(action.type){
        case 'add':
            return {
                count:state.count + 1
            }

        case 'dec':
            return {
                count:state.count - 1
            }

        case 'reset':
            return {
                count:2
            }

        default:
            return state;
    }
}

let reducer2 = function (state = initialState,action) {
    switch(action.type){

        case 'dec':{
            return {
                count:state.count - 1
            }
        }
        default:
            return state;
    }
}

let reducer3 = function (state = initialState,action) {
    switch(action.type){
        case 'rest':{
            return {
                count:2
            }
        }
        default:
            return state;
    }
}

function getCurrentState(obj){
    let state;
    for (state of obj) {
        console.log(obj);
        return state;
    }
}


test('test sum',()=>{
    expect(sum(1,2)).toBe(3);
})

test('test combineReducers',()=>{
    expect((function test(){
        const reducers = combineReducers({reducer1});
        const store = createStore(reducers);
        if (((store.getState()).reducer1.count !== 2)) return false;
        store.dispatch({type:'add'});
        if ((store.getState()).reducer1.count !== 3) return false;
        store.dispatch({type:'dec'});
        if ((store.getState()).reducer1.count !== 2) return false;
        store.dispatch({type:'reset'});
        if ((store.getState()).reducer1.count !== 2) return false;
        return true;
    })()).toBe(true)
})

