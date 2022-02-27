import { CalendarState } from "./calendar/type";

export interface State {
    calendar?: CalendarState;
}

export interface Dispatch {
    (action:any):void;
}

export interface Initial {
    state: State;
    dispatch: Dispatch|null;
}
