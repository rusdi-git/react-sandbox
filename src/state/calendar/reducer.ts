import {CalendarState,CalendarAction,CalendarSelectActionType} from "./type";

const initial_state:CalendarState = {selected:null};

interface CalendarReducer {
  (state: CalendarState, action: CalendarAction) : CalendarState;
}

const calendarReducer:CalendarReducer = (state,action) =>{
    switch(action.type) {
      case CalendarSelectActionType.SUCCESS_CHANGE_SELECTED:
        return {...state, selected:action.payload.selected};
      case CalendarSelectActionType.FAILED_CHANGE_SELECTED:
        return {...state, selected:null};
      case CalendarSelectActionType.NO_SELECTED:
        return {...state, selected:null};
      default:
        return state;
    }
  }

const getCalendarReducer:()=>[CalendarReducer,CalendarState] = ()=>{
    return [calendarReducer,initial_state];
};

export default getCalendarReducer;
