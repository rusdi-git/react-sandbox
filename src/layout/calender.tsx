import React, { useContext, createContext } from 'react';
import {v4} from 'uuid';
import { addDays, addMonths, format, isSameDay, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import { endOfMonth, endOfWeek, isToday } from 'date-fns/esm';
import id from 'date-fns/esm/locale/id/index.js';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

type CalendarContext = {
    state: {selected:Date|null};
    changeSelected?: (val:Date)=>void;
}

const CalendarStateManager = createContext<CalendarContext>({state:{selected:null}});

function CalHeader(props:{currentDate:Date, changeDate:(val:Date)=>void}) {
    const nextMonth =() =>{
        props.changeDate(addMonths(props.currentDate,1));
    }
    const prevMonth = ()=>{
        props.changeDate(subMonths(props.currentDate,1));
    }
    const MonthFormat = 'MMMM';
    const YearFormat = 'yyyy';
    const headerText = `${format(props.currentDate,MonthFormat,{locale:id})}-${format(props.currentDate,YearFormat,{locale:id})}`;
    
    return (
        <Box sx={{display:'flex',flexDirection:"row"}}>
            <Box sx={{marginRight:'20px'}}>
            <IconButton aria-label='previous' onClick={()=>{prevMonth()}}><ChevronLeftIcon/></IconButton>
                <IconButton aria-label='next' onClick={()=>{nextMonth()}}><ChevronRightIcon/></IconButton>
            </Box>
            <Box><h3 style={{textAlign:"center"}}>{headerText}</h3></Box>
        </Box>
    )
}

function CalDays() {
    const dateFormat = 'EEEEEE';
    const days = [];
    let startDate = startOfWeek(new Date());

    for (let i = 0; i<7;i++) {
        days.push(
            <Box key={`day-${v4()}`} sx={{width:'50px',height:'50px'}}>
                <p style={{textAlign:"center"}}>{format(addDays(startDate,i),dateFormat,{locale:id})}</p>
            </Box>
        )
    }

    return <Box sx={{display:"flex", flexDirection:"row"}}>{days}</Box>
}

function CalCell(props:{day:Date}) {
    const dateFormat = 'd';
    const formattedDate = format(props.day,dateFormat,{locale:id});
    const {state,changeSelected} = useContext(CalendarStateManager);
    const selected = state.selected;
    const isDateToday = isToday(props.day);
    const isSelected = selected && isSameDay(selected,props.day);
    const selectDate = (val:Date)=>{
        changeSelected!(val);
    }
    return (
        <Box sx={(theme)=>({
            width:'50px',
            height:'50px',
            bgcolor:isSelected?theme.palette.primary.main:isDateToday?theme.palette.success.main: theme.palette.grey["50"],
            ...((isSelected || isDateToday) && {borderRadius:'50px'}),
            ...(!isSelected && {"&:hover": {
                bgcolor: isDateToday? theme.palette.success.light:theme.palette.grey["200"],
                borderRadius:'50px',
            }})
        })} onClick={()=>{selectDate(props.day)}}><Typography sx={(theme)=>({textAlign:"center",color:theme.palette.text.primary,paddingTop:'15px'})}>{formattedDate}</Typography></Box>
    )
}

function CalRows(props:{currentDate:Date}) {
    const monthStart = startOfMonth(props.currentDate);
    const monthEnd = endOfMonth(props.currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const Rows:any[] = [];

    let days = [];
    let day = startDate;
    while(day<=endDate) {
        for(let i=0;i<7;i++){
            days.push(<CalCell day={day} key={`day-cell-${v4()}`}/>);
            day=addDays(day,1)
        }
        Rows.push(
            <Box key={`day-row-${v4()}`} sx={{display:"flex",flexDirection:"row"}}>{days}</Box>
        );
        days = [];
    }
    return (
        <Box sx={(theme)=>({
            backgroundColor:theme.palette.grey["50"]
        })}>
            {Rows}
        </Box>
    )
}


export default function Calender () {
    const [displayDate,setDisplayDate] = React.useState(new Date());
    const [selectedDate,setSelectedDate] = React.useState<Date|null>(null);

    return <CalendarStateManager.Provider value={{state:{selected:selectedDate},changeSelected:setSelectedDate}}>
        <Box style={{maxWidth:'400px'}}>
        <CalHeader currentDate={displayDate} changeDate={setDisplayDate}/>
        <CalDays />
        <CalRows currentDate={displayDate}/>
    </Box>
    </CalendarStateManager.Provider>
}