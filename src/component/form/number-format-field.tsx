import React from 'react';
import { Controller } from 'react-hook-form';

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

import { ChakraFieldProps } from '../type';
import { isNil } from 'lodash';
import { formatCurrency } from '../../helper/general';

export default function ChakraNumberFormatField(props: ChakraFieldProps) {
  return (
    <Controller
      name={props.field}
      control={props.control}
      render={({ field: { value, onChange } }) => {
        const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
          const val = event.currentTarget.value;
          if (!val.replace('Rp', '').trim()) {
            onChange(null);
          } else {
            const parsedValue = val.replace(/[^\d]+/gm, '');
            if (parsedValue) onChange(parseInt(parsedValue));
          }
        };
        return (
          <FormControl isInvalid={props.error !== undefined} my="1">
            {props.label === null ? null : (
              <FormLabel htmlFor={props.field}>{props.label || props.field}</FormLabel>
            )}
            <Input
              id={props.field}
              placeholder={props.label || props.field}
              value={isNil(value) ? 'Rp ' : formatCurrency(value)}
              onChange={handleChange}
            />
            <FormErrorMessage>{props.error && props.error.message}</FormErrorMessage>
          </FormControl>
        );
      }}
    />
  );
}
