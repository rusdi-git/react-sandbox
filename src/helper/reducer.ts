import React from 'react';
import { GenericActionType, State, StateKey, StateType } from '../state/type';

type UseCombinedReducerParams = {
  [x in StateKey]: [StateType, React.Dispatch<GenericActionType>];
};

type UseCombinedReducer = (
  useReducer: UseCombinedReducerParams
) => [State, React.Dispatch<GenericActionType>];

const useCombinedReducer: UseCombinedReducer = (useReducer) => {
  // Global state
  const state = Object.keys(useReducer).reduce(
    (acc, key) => ({ ...acc, [key]: useReducer[key as StateKey][0] }),
    {} as State
  );
  // Global dispatch
  const dispatch = (action: GenericActionType) =>
    Object.keys(useReducer)
      .map((key) => useReducer[key as StateKey][1])
      .forEach((fn) => fn(action));
  return [state, dispatch];
};

export default useCombinedReducer;
