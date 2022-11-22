import React from 'react';
import { format } from 'date-fns';
import id from 'date-fns/locale/id/index';
import { Controller } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { CalendarContext, CalendarMode, ChakraFieldProps } from '../type';
import Calendar from '../calendar';

export default function ChakraDateField(props: ChakraFieldProps) {
  const [fieldState, setFieldState] = React.useState<{
    displayDate: Date;
    mode: CalendarMode;
    isOpen: boolean;
  }>({
    displayDate: new Date(),
    mode: 'date',
    isOpen: false,
  });
  const togglePopOver = () => setFieldState({ ...fieldState, isOpen: !fieldState.isOpen });
  const closePopOver = () => setFieldState({ ...fieldState, isOpen: false });

  return (
    <Controller
      name={props.field}
      control={props.control}
      render={({ field: { value, onChange } }) => {
        const changeSelected = (val: Date) => {
          onChange(val);
          togglePopOver();
        };
        return (
          <Popover returnFocusOnClose={false} isOpen={fieldState.isOpen} onClose={closePopOver}>
            <PopoverTrigger>
              <FormControl isInvalid={props.error !== undefined} my="1">
                <FormLabel htmlFor={props.field}>{props.label || props.field}</FormLabel>
                <Input
                  id={props.field}
                  placeholder={props.label || props.field}
                  value={value ? format(value, 'P', { locale: id }) : ''}
                  readOnly
                  onClick={togglePopOver}
                />
                <FormErrorMessage>{props.error && props.error.message}</FormErrorMessage>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent width="350px">
              <PopoverBody mx={'auto'}>
                <Calendar width={'300px'} handleSelect={changeSelected} />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
}
