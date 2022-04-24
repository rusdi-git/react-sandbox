import { GenericReducer } from '../type';
import themeInitialState from './initial';
import { ThemeState, ThemeAction, ChangeThemeActionType } from './type';

interface ThemeReducer extends GenericReducer<ThemeState> {
  (state: ThemeState, action: ThemeAction): ThemeState;
}

const themeReducer: ThemeReducer = (state, action) => {
  switch (action.type) {
    case ChangeThemeActionType.DARK_THEME:
      return { ...state, theme: (action as ThemeAction).payload.theme };
    case ChangeThemeActionType.LIGHT_THEME:
      return { ...state, theme: (action as ThemeAction).payload.theme };
    default:
      return state;
  }
};

const getThemeReducer: () => [ThemeReducer, ThemeState] = () => {
  return [themeReducer, themeInitialState];
};

export default getThemeReducer;
