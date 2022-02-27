export interface CalendarState {
    selected: Date|null;
}

export enum CalendarSelectActionType {
    SUCCESS_CHANGE_SELECTED = "SUCCESS_CHANGE_SELECTED",
    FAILED_CHANGE_SELECTED = "FAILED_CHANGE_SELECTED",
    NO_SELECTED = "NO_SELECTED"
}

interface CalendarChangeSelected {
    type: CalendarSelectActionType.SUCCESS_CHANGE_SELECTED;
    payload: CalendarState;
}

interface CalendarFailedChangeSelected {
    type: CalendarSelectActionType.FAILED_CHANGE_SELECTED;
    payload: CalendarState;
}

interface CalendarNoSelected {
    type: CalendarSelectActionType.NO_SELECTED;
    payload: CalendarState;
}

export type CalendarAction = CalendarChangeSelected|CalendarFailedChangeSelected|CalendarNoSelected;
