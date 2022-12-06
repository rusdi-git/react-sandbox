import React from 'react';
import { debounce, get } from 'lodash';

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react';

import { ChakraAutoCompleteFieldProps } from '../type';
import useSWRImmutable from 'swr/immutable';

export default function ChakraAutoCompleteField<T>(props: ChakraAutoCompleteFieldProps<T>) {
  const [localState, setLocalState] = React.useState<{
    value: T | null;
    inputValue: string;
    searchValue: string;
    isOpen: boolean;
  }>({ value: null, inputValue: '', searchValue: '', isOpen: false });
  const [getData, setGetData] = React.useState(false);
  const { data, error } = useSWRImmutable(
    localState.searchValue ? { filter: localState.searchValue } : null,
    props.fetchData
  );
  const ref = React.useRef(null);
  useOutsideClick({
    ref: ref,
    handler: () => setLocalState({ ...localState, isOpen: false }),
  });

  const debouncedInputChange = React.useCallback(
    debounce(() => {
      setGetData(true);
    }, 1000),
    []
  );
  React.useEffect(() => {
    return () => debouncedInputChange.cancel();
  }, []);
  React.useEffect(() => {
    if (getData) {
      if (localState.inputValue.length > 3)
        setLocalState({ ...localState, searchValue: localState.inputValue });
      setGetData(false);
    }
  }, [getData]);

  React.useEffect(() => {
    if (localState.value) {
      props.triggerEffectValue?.(localState.value);
      closePopOver();
    }
  }, [JSON.stringify(localState.value)]);

  const closePopOver = () => {
    setLocalState({ ...localState, isOpen: false });
  };
  const changeInput = (val: string) => {
    setLocalState({ ...localState, inputValue: val, ...(val.length > 3 && { isOpen: true }) });
    debouncedInputChange();
  };
  const setOptionValue = (val: T) => {
    setLocalState({
      ...localState,
      value: val,
      isOpen: false,
      inputValue: props.currentInputSource
        ? get(val, props.currentInputSource)
        : localState.inputValue,
    });
  };
  return (
    <Popover
      returnFocusOnClose={false}
      autoFocus={false}
      isOpen={localState.isOpen}
      onClose={closePopOver}
    >
      <PopoverTrigger>
        <FormControl my="1">
          <FormLabel htmlFor={`autocomplete-${props.field}`}>
            {props.label || props.field}
          </FormLabel>
          <Input
            id={`autocomplete-${props.field}`}
            placeholder={props.label}
            value={localState.inputValue}
            onChange={(e) => changeInput(e.target.value)}
          />
        </FormControl>
      </PopoverTrigger>
      <PopoverContent maxWidth="250px">
        <PopoverBody ref={ref}>
          <ChakraAutoCompleteList<T>
            items={data || []}
            label={props.labelKey}
            onChooseOption={setOptionValue}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

function ChakraAutoCompleteList<T>(props: {
  items: T[];
  label: keyof T;
  onChooseOption: (val: T) => void;
}) {
  return (
    <VStack>
      {props.items.map((item, i) => (
        <Box
          key={`autocomplete-item-${i}`}
          _hover={{ backgroundColor: 'gray.200' }}
          width="100%"
          cursor="pointer"
          onClick={() => props.onChooseOption(item)}
        >
          <Text textAlign="center">{item[props.label]}</Text>
        </Box>
      ))}
    </VStack>
  );
}
