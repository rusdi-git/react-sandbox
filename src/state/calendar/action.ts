import { CalendarSelectActionType } from "./type";

export const successChangeCalendarSelected = (selected:Date)=>{
    const payload = {selected};
    return {payload,type:CalendarSelectActionType.SUCCESS_CHANGE_SELECTED}
}

export const failedChangeCalendarSelected = ()=>{
    return {type:CalendarSelectActionType.FAILED_CHANGE_SELECTED}
}

export const ChangeCalendarNoSelected = ()=>{
    return {type:CalendarSelectActionType.FAILED_CHANGE_SELECTED}
}