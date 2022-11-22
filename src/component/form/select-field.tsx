import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import { ChakraRadioFieldProps } from '../type';

export default function ChakraSelectField(props: ChakraRadioFieldProps) {
  const selectInputs = props.valueMap.map((i, j) => {
    return (
      <option value={i.value} key={`select-${props.field}-${j}`}>
        {i.label || i.value}
      </option>
    );
  });
  return (
    <Controller
      name={props.field}
      control={props.control}
      render={({ field: { value, onChange } }) => (
        <FormControl isInvalid={props.error !== undefined} my="1">
          {props.label === null ? null : (
            <FormLabel htmlFor={props.field}>{props.label || props.field}</FormLabel>
          )}
          <Select id={props.field} value={value} onChange={onChange}>
            {selectInputs}
          </Select>
          <FormErrorMessage>{props.error && props.error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
