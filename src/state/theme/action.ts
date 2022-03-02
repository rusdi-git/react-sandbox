import { ChangeThemeActionType } from "./type";

export const changeThemeDark = ()=>{
    return {type:ChangeThemeActionType.DARK_THEME,payload:{theme:'dark'}};
}

export const changeThemeLight = ()=>{
    return {type:ChangeThemeActionType.LIGHT_THEME,payload:{theme:'light'}};
}