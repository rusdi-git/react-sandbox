import React from 'react';
import { Controller } from 'react-hook-form';

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

import { ChakraFieldProps } from '../type';

export default function ChakraTextField(props: ChakraFieldProps) {
  return (
    <Controller
      name={props.field}
      control={props.control}
      render={({ field }) => (
        <FormControl isInvalid={props.error !== undefined} my="1">
          {props.label === null ? null : (
            <FormLabel htmlFor={props.field}>{props.label || props.field}</FormLabel>
          )}
          <Input
            id={props.field}
            placeholder={props.label || props.field}
            {...(props.type && { type: props.type })}
            {...field}
          />
          <FormErrorMessage>{props.error && props.error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
