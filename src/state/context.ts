import { createContext } from 'react';
import credentialInitialState from './credential/initial';
import themeInitialState from './theme/initial';
import { Initial } from './type';

const initial: Initial = {
  state: {
    credential: credentialInitialState,
    theme: themeInitialState,
  },
  dispatch: () => {
    // Initial dispatch function
  },
};

const StateManager = createContext(initial);

export default StateManager;
