import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import { ChakraRadioFieldProps } from '../type';

export default function ChakraRadioField(props: ChakraRadioFieldProps) {
  const radioInputs = props.valueMap.map((i, j) => {
    return (
      <Radio value={i.value} key={`radio-${props.field}-${j}`}>
        {i.label || i.value}
      </Radio>
    );
  });
  return (
    <Controller
      name={props.field}
      control={props.control}
      render={({ field: { value, onChange } }) => (
        <FormControl isInvalid={props.error !== undefined} my="1">
          <FormLabel htmlFor={props.field}>{props.label || props.field}</FormLabel>
          <RadioGroup id={props.field} value={value} onChange={onChange}>
            <Stack direction="row">{radioInputs}</Stack>
          </RadioGroup>
          <FormErrorMessage>{props.error && props.error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
