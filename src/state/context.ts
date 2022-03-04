import { createContext } from 'react';
import { Initial } from './type';

const initial: Initial = {
  state: {},
  dispatch: null,
};

const StateManager = createContext(initial);

export default StateManager;
