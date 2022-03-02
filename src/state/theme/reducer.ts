import { ThemeState, ThemeAction, ChangeThemeActionType } from "./type";

const initialState:ThemeState = {theme:'light'};

interface ThemeReducer {
    (state:ThemeState, action:ThemeAction): ThemeState;
}

const themeReducer:ThemeReducer = (state,action)=>{
    switch(action.type) {
        case ChangeThemeActionType.DARK_THEME:
            return {...state,theme:action.payload.theme};
        case ChangeThemeActionType.LIGHT_THEME:
            return {...state,theme:action.payload.theme};
        default:
            return state;
    }
}

const getThemeReducer:()=>[ThemeReducer,ThemeState] = ()=>{
    return [themeReducer,initialState];
}

export default getThemeReducer;