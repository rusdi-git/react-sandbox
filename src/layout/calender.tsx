import React from 'react';
import {v4} from 'uuid';
import Grid from '@mui/material/Grid';
import { addDays, addMonths, format, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import { endOfMonth, endOfWeek } from 'date-fns/esm';
import id from 'date-fns/esm/locale/id/index.js';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';

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
        <Grid container item xs={true}>
            <Grid item xs={2}>
                <IconButton aria-label='previous' onClick={()=>{prevMonth()}}><ChevronLeftIcon/></IconButton>
                <IconButton aria-label='next' onClick={()=>{nextMonth()}}><ChevronRightIcon/></IconButton>
            </Grid>
            <Grid item xs={10}><h3 style={{textAlign:"center"}}>{headerText}</h3></Grid>            
        </Grid>
    )
}

function CalDays(props:{currentDate:Date}) {
    const dateFormat = 'EEEEEE';
    const days = [];
    let startDate = startOfWeek(props.currentDate);

    for (let i = 0; i<7;i++) {
        days.push(
            <Grid key={`day-${v4()}`} xs={true} item>
                <p style={{textAlign:"center"}}>{format(addDays(startDate,i),dateFormat,{locale:id})}</p>
            </Grid>
        )
    }

    return <Grid container item>{days}</Grid>
}

function CalCell(props:{day:Date}) {
    const dateFormat = 'd';
    const formattedDate = format(props.day,dateFormat,{locale:id});
    return (
        <Grid item xs={true} sx={(theme)=>({
            bgcolor:theme.palette.grey["50"],
            "&:hover": {
                bgcolor: theme.palette.grey["200"]
            }
        })}><p style={{textAlign:"center"}}>{formattedDate}</p></Grid>
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
            <Grid container item key={`day-row-${v4()}`}>{days}</Grid>
        );
        days = [];
    }
    return (
        <Grid container>
            {Rows}
        </Grid>
    )
}


export default function Calender () {
    const [displayDate,useDisplayDate] = React.useState(new Date());
    const useChangeDate = (val:Date)=>{
        useDisplayDate(val);
    }
    return <Grid container style={{maxWidth:'600px'}}>
        <CalHeader currentDate={displayDate} changeDate={useChangeDate}/>
        <CalDays currentDate={displayDate}/>
        <CalRows currentDate={displayDate}/>
    </Grid>
}