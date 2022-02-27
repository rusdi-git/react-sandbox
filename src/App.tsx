import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Main from './layout/main';
import StateManager from './state/context';
import useCombinedReducer from './helper/reducer';
import getCalendarReducer from './state/calendar/reducer';


function App() {
  const [state,dispatch] = useCombinedReducer({
    calendar:React.useReducer(...getCalendarReducer())
  });

  return (
    <StateManager.Provider value={{state,dispatch}}>
      <BrowserRouter>
    <Main/>
    </BrowserRouter>
    </StateManager.Provider>
  )
}

export default App;
