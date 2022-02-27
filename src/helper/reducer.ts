import React from 'react';
import {State} from "../state/type";

type UseCombinedReducer = (useReducer:{[index:string]:[any,React.Dispatch<any>]})=>[State,any];

const useCombinedReducer:UseCombinedReducer = (useReducer)=>{
    // Global state
    const state = Object.keys(useReducer).reduce((acc,key)=>({...acc,[key]:useReducer[key][0]}),{});
    // Global dispatch
    const dispatch = (action:any) => Object.keys(useReducer).map(key=>useReducer[key][1]).forEach(fn=>fn(action));
    return [state,dispatch];
};

export default useCombinedReducer
