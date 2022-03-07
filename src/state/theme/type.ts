export interface ThemeState {
  theme: 'light' | 'dark';
}

export enum ChangeThemeActionType {
  DARK_THEME = 'DARK_THEME',
  LIGHT_THEME = 'LIGHT_THEME',
}

interface ChangeThemeActionDark {
  type: ChangeThemeActionType.DARK_THEME;
  payload: ThemeState;
}

interface ChangeThemeActionLight {
  type: ChangeThemeActionType.LIGHT_THEME;
  payload: ThemeState;
}

export type ThemeAction = ChangeThemeActionDark | ChangeThemeActionLight;
