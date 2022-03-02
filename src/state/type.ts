import { ThemeState } from "./theme/type";

export interface State {
    theme?: ThemeState
}

export interface Dispatch {
    (action:any):void;
}

export interface Initial {
    state: State;
    dispatch: Dispatch|null;
}
