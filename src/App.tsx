import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Main from './layout/main';
import StateManager from './state/context';
import useCombinedReducer from './helper/reducer';
import getThemeReducer from './state/theme/reducer';
import getCredentialReducer from './state/credential/reducer';

function App() {
  const [state, dispatch] = useCombinedReducer({
    theme: React.useReducer(...getThemeReducer()),
    credential: React.useReducer(...getCredentialReducer()),
  });
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: state.theme?.theme || 'light',
        },
      }),
    [state.theme?.theme]
  );

  return (
    <StateManager.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </ThemeProvider>
    </StateManager.Provider>
  );
}

export default App;
