import React from 'react';
import {
  addDays,
  addMonths,
  addYears,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  isSameDay,
  isSameMonth,
  isSameYear,
  isThisMonth,
  isThisYear,
  isToday,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subMonths,
  subYears,
} from 'date-fns';
import id from 'date-fns/locale/id/index';

import { Box, Button, ColorProps, Flex, IconButton, Text, VStack } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { CalendarContext, CalendarMode } from './type';

const CalendarStateManager = React.createContext<CalendarContext>({
  state: { selected: null, displayed: new Date(), mode: 'date' },
  changeDisplayed: () => {
    //
  },
  changeSelected: () => {
    //
  },
});

export default function Calendar() {
  const [state, setState] = React.useState<{
    displayDate: Date;
    mode: CalendarMode;
    selected: null | Date;
  }>({
    displayDate: new Date(),
    mode: 'date',
    selected: null,
  });
  const changeDisplayDate = (val: Date, mode: CalendarMode) =>
    setState({ ...state, displayDate: val, mode });
  const changeSelected = (val: Date) => setState({ ...state, selected: val });

  return (
    <CalendarStateManager.Provider
      value={{
        state: { selected: state.selected, displayed: state.displayDate, mode: state.mode },
        changeSelected,
        changeDisplayed: changeDisplayDate,
      }}
    >
      <Box width="lg">
        <CalHeader />
        {state.mode === 'date' ? <CalDays /> : null}
        <CalRows />
      </Box>
    </CalendarStateManager.Provider>
  );
}

function CalHeader() {
  const { state, changeDisplayed } = React.useContext(CalendarStateManager);
  const nextDisplay = () => {
    switch (state.mode) {
      case 'date':
        changeDisplayed(addMonths(state.displayed, 1), 'date');
        break;
      case 'month':
        changeDisplayed(addYears(state.displayed, 1), 'month');
        break;
      case 'year':
        changeDisplayed(addYears(state.displayed, 16), 'year');
        break;
      default:
        break;
    }
  };
  const prevDisplay = () => {
    switch (state.mode) {
      case 'date':
        changeDisplayed(subMonths(state.displayed, 1), 'date');
        break;
      case 'month':
        changeDisplayed(subYears(state.displayed, 1), 'month');
        break;
      case 'year':
        changeDisplayed(subYears(state.displayed, 16), 'year');
        break;
      default:
        break;
    }
  };
  const MonthFormat = 'MMMM';
  const initialYear =
    state.mode === 'year'
      ? state.displayed.getFullYear() - (state.displayed.getFullYear() % 16 || 16)
      : state.displayed.getFullYear();
  const yearHeader =
    state.mode === 'year' ? (
      <Text>{`${initialYear + 1}-${initialYear + 16}`}</Text>
    ) : (
      <Button onClick={() => changeDisplayed(state.displayed, 'year')} size="sm">
        {initialYear}
      </Button>
    );

  return (
    <Flex justifyContent="space-between" px="3" alignItems="center">
      <IconButton
        aria-label="previous"
        colorScheme="cyan"
        variant="ghost"
        onClick={() => {
          prevDisplay();
        }}
        icon={<MdChevronLeft />}
        size="lg"
        fontSize="2xl"
      />
      <VStack>
        {yearHeader}
        {state.mode === 'date' ? (
          <Button onClick={() => changeDisplayed(state.displayed, 'month')}>
            {format(state.displayed, MonthFormat, { locale: id })}
          </Button>
        ) : null}
      </VStack>
      <IconButton
        aria-label="next"
        colorScheme="cyan"
        variant="ghost"
        size="lg"
        fontSize="2xl"
        onClick={() => {
          nextDisplay();
        }}
        icon={<MdChevronRight />}
      />
    </Flex>
  );
}

function CalDays() {
  const dateFormat = 'EEEEE'; // single letter day name
  const days: JSX.Element[] = [];
  const startDate = startOfWeek(new Date());

  for (let i = 0; i < 7; i++) {
    days.push(
      <Flex key={`day-${i}`} width="60px" height="60px" alignItems="center" justifyContent="center">
        <Text textAlign="center">{format(addDays(startDate, i), dateFormat, { locale: id })}</Text>
      </Flex>
    );
  }

  return <Flex justifyContent="center">{days}</Flex>;
}

function CalCell(props: { day: Date }) {
  const { changeSelected, state, changeDisplayed } = React.useContext(CalendarStateManager);
  const dateFormat = state.mode === 'date' ? 'd' : state.mode === 'month' ? 'MMM' : 'yyyy';
  const formattedDate = format(props.day, dateFormat, { locale: id });
  const isDateToday =
    state.mode === 'date'
      ? isToday(props.day)
      : state.mode === 'month'
      ? isThisMonth(props.day)
      : isThisYear(props.day);
  const isSelected = state.selected
    ? state.mode === 'date'
      ? isSameDay(state.selected, props.day)
      : state.mode === 'month'
      ? isSameMonth(state.selected, props.day)
      : isSameYear(state.selected, props.day)
    : false;
  const bgColor: ColorProps['color'] = isSelected
    ? 'baseBlue'
    : isDateToday
    ? 'baseGreen'
    : 'white';
  const selectDate =
    state.mode === 'date'
      ? (val: Date) => {
          changeSelected!(val);
        }
      : (val: Date) => changeDisplayed(val, state.mode === 'year' ? 'month' : 'date');
  return (
    <Box
      cursor="pointer"
      onClick={() => {
        selectDate(props.day);
      }}
      width="60px"
      height="60px"
      backgroundColor={bgColor}
      py={2}
      _hover={{ backgroundColor: 'green.300' }}
    >
      <Text textAlign="center">{formattedDate}</Text>
    </Box>
  );
}

function CalRows() {
  const { state } = React.useContext(CalendarStateManager);

  const rows: JSX.Element[] = [];
  let row: JSX.Element[] = [];
  switch (state.mode) {
    case 'date':
      {
        const monthStart = startOfMonth(state.displayed);
        const monthEnd = endOfMonth(state.displayed);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
        let day = startDate;
        let rowKey = 0;
        while (day <= endDate) {
          for (let i = 0; i < 7; i++) {
            row.push(<CalCell day={day} key={`day-cell-${i}`} />);
            day = addDays(day, 1);
          }
          rows.push(
            <Flex key={`day-row-${rowKey}`} flexDirection="row" justifyContent="center">
              {row}
            </Flex>
          );
          row = [];
          rowKey++;
        }
      }
      break;
    case 'month':
      {
        const yearStart = startOfYear(state.displayed);
        const yearEnd = endOfYear(state.displayed);
        let month = yearStart;
        let rowKey = 0;
        while (month < yearEnd) {
          for (let i = 0; i < 4; i++) {
            row.push(<CalCell key={`month-cell-${i}`} day={month} />);
            month = addMonths(month, 1);
          }
          rows.push(
            <Flex key={`month-row-${rowKey}`} flexDirection="row" justifyContent="center">
              {row}
            </Flex>
          );
          row = [];
          rowKey++;
        }
      }
      break;
    case 'year':
      {
        const yearStart = subYears(state.displayed, (state.displayed.getFullYear() % 16 || 16) - 1);
        const yearEnd = addYears(yearStart, 16);
        let year = yearStart;
        let rowKey = 0;
        while (year < yearEnd) {
          for (let i = 0; i < 4; i++) {
            row.push(<CalCell key={`year-cell-${i}`} day={year} />);
            year = addYears(year, 1);
          }
          rows.push(
            <Flex key={`year-row-${rowKey}`} flexDirection="row" justifyContent="center">
              {row}
            </Flex>
          );
          row = [];
          rowKey++;
        }
      }
      break;
    default:
      break;
  }

  return <Box>{rows}</Box>;
}
