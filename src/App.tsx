import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';

import Main from './layout/main';
import StateManager from './state/context';
import useCombinedReducer from './helper/reducer';
import getCredentialReducer from './state/credential/reducer';
import theme from './config/theme';

function App() {
  const [state, dispatch] = useCombinedReducer({
    credential: React.useReducer(...getCredentialReducer()),
  });

  return (
    <StateManager.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <Main />
        </ChakraProvider>
      </BrowserRouter>
    </StateManager.Provider>
  );
}

export default App;
