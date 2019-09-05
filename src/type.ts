 // 类型定义文件，定义了项目中用到的类型

export type State = any;

export interface IBaseAction {
    type:any;
}

export interface IAction extends IBaseAction {
    [props:string]:any;
}

export type Reducer = (state:State,action:IAction) => State;

export interface IReducersMapObject {
    [key: string]: Reducer;
}

export type CombineReducers = (reducers: IReducersMapObject) => Reducer;

export type Dispatch = (action:IAction) => IAction;

export interface IVoidfunc {
    (): void;
}

export  type IUnSubscribe = IVoidfunc;
export interface ISubscribe {
    (param:IVoidfunc):IUnSubscribe
}
