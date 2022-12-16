import React from 'react';
import {
  useForm,
  useFieldArray,
  Control,
  useFormContext,
  FormProvider,
  UseFormWatch,
  FieldValues,
} from 'react-hook-form';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
} from '@chakra-ui/react';
import ChakraSelectField from '../component/form/select-field';
import { MdAddCircle, MdDelete, MdDeleteForever, MdLibraryAdd } from 'react-icons/md';
import ChakraTextField from '../component/form/text-field';
import ChakraDateField from '../component/form/date-field';
import { GreaterThanEqual, LessThanEqual } from '../component/entity';
import { FieldData, GroupSchema } from './type';

type DataType = 'string' | 'number' | 'date';
export const groupOperator = ['and', 'or', 'not'] as const;
export const groupOperatorMap: { value: typeof groupOperator[number]; label: string }[] = [
  { value: 'and', label: 'And' },
  { value: 'or', label: 'Or' },
  { value: 'not', label: 'Not' },
];
export const operatorNumberOptions = ['eq', 'ne', 'gt', 'gte', 'lt', 'lte'] as const;
export const operatorStringOptions = ['eq', 'ne', 'like', 'ilike'] as const;
export const operatorDateOptions = ['eq', 'ne', 'gt', 'gte', 'lt', 'lte'] as const;
const operatorNumberOptionsMap: {
  value: typeof operatorNumberOptions[number];
  label: string | JSX.Element;
}[] = [
  { value: 'eq', label: '=' },
  { value: 'ne', label: '!=' },
  { value: 'gt', label: '>' },
  { value: 'gte', label: <GreaterThanEqual /> },
  { value: 'lt', label: '<' },
  { value: 'lte', label: <LessThanEqual /> },
];
const operatorStringOptionsMap: { value: typeof operatorStringOptions[number]; label: string }[] = [
  { value: 'eq', label: 'Equal' },
  { value: 'ne', label: 'Not Equal' },
  { value: 'like', label: 'Contain' },
  { value: 'ilike', label: 'IContain' },
];
const operatorDateOptionsMap: {
  value: typeof operatorDateOptions[number];
  label: string | JSX.Element;
}[] = [
  { value: 'eq', label: '=' },
  { value: 'ne', label: '!=' },
  { value: 'gt', label: '>' },
  { value: 'gte', label: <GreaterThanEqual /> },
  { value: 'lt', label: '<' },
  { value: 'lte', label: <LessThanEqual /> },
];
const operatorMap: Record<
  DataType,
  typeof operatorNumberOptionsMap | typeof operatorStringOptionsMap | typeof operatorDateOptionsMap
> = {
  number: operatorNumberOptionsMap,
  string: operatorStringOptionsMap,
  date: operatorDateOptionsMap,
};

interface FilterFormProps {
  fieldOptions: FieldData[];
  open: boolean;
  toggleOpen: () => void;
  defaultValue?: GroupSchema;
  handleSubmit: (params: GroupSchema) => void;
}

const useFilterFormFields = (prefix: string) => {
  const { control, getValues, watch } = useFormContext();
  const itemsArrayInputPath = `${prefix}items` as 'items';
  const { fields, append, remove } = useFieldArray({ control, name: itemsArrayInputPath });
  const addItem = (type: 'group' | 'item', index: number) => {
    if (type === 'group') append({ type: 'group', operator: 'and', items: [] });
    else append({ type: 'item', field: '', operator: '', value: '' });
  };
  const removeItem = (itemIndex: number) => {
    remove(itemIndex);
  };
  return { control, addItem, removeItem, fields, getValues, watch };
};

export default function FilterForm(props: FilterFormProps) {
  const mappedFieldOption: Record<string, FieldData> = props.fieldOptions.reduce((acc, item) => {
    return Object.assign(acc, { [item.field]: item });
  }, {});
  const fieldLabel = props.fieldOptions.map((i) => {
    return { value: i.field, label: i.label };
  });

  const methods = useForm({
    defaultValues: {
      type: 'group',
      operator: 'and',
      items: [],
      errorData: '',
      ...(props.defaultValue || {}),
    },
  });

  React.useEffect(() => {
    if (methods.formState.isSubmitSuccessful) props.toggleOpen();
  }, [methods.formState.isSubmitSuccessful]);

  React.useEffect(() => {
    methods.reset({
      type: 'group',
      operator: 'and',
      items: [],
      errorData: '',
      ...(props.defaultValue || {}),
    });
  }, [JSON.stringify(props.defaultValue)]);

  const submitData = async (data: unknown) => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        props.handleSubmit(data as GroupSchema);
        resolve(true);
      }, Math.random() * 2000);
    });
  };

  return (
    <Modal isOpen={props.open} onClose={props.toggleOpen} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filter Form</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" noValidate onSubmit={methods.handleSubmit(submitData)}>
            {methods.formState.errors.errorData !== undefined ? (
              <Alert status="error">
                <AlertIcon />
                {methods.formState.errors.errorData.message}
              </Alert>
            ) : null}
            <FormProvider {...methods}>
              <FilterFormGroup prefix="" fieldData={mappedFieldOption} fieldOptions={fieldLabel} />
            </FormProvider>
            <Button type="submit">Filter</Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function FilterFormGroup(props: {
  prefix: string;
  fieldData: Record<string, FieldData>;
  fieldOptions: { value: FieldData['field']; label: FieldData['label'] }[];
}) {
  const allowGroup = (props.prefix.match(/items/gi) || []).length < 2;
  const { control, fields, addItem, removeItem, getValues, watch } = useFilterFormFields(
    props.prefix
  );
  return (
    <Box padding="1" width="100%">
      <Flex borderLeft="1px" borderColor="gray.200" flexDirection="column">
        <Box width="5rem" marginLeft="-4">
          <ChakraSelectField
            field={`${props.prefix}operator`}
            control={control as unknown as Control}
            label={null}
            valueMap={groupOperatorMap}
            size="sm"
            variant="filled"
          />
        </Box>
        <Flex flexDirection="column" paddingLeft="6">
          {fields.map((f, i) => {
            if (getValues(`${props.prefix}items.${i}.type`) === 'group') {
              return (
                <HStack key={f.id}>
                  <FilterFormGroup
                    prefix={`${props.prefix}items.${i}.`}
                    fieldData={props.fieldData}
                    fieldOptions={props.fieldOptions}
                  />
                  <Tooltip label="Delete Group">
                    <IconButton
                      colorScheme="red"
                      icon={
                        <span>
                          <MdDeleteForever />
                        </span>
                      }
                      aria-label="Delete Group"
                      onClick={() => removeItem(i)}
                      variant="ghost"
                    />
                  </Tooltip>
                </HStack>
              );
            }
            return (
              <FilterFormItem
                key={f.id}
                prefix={`${props.prefix}items.${i}`}
                control={control}
                fieldOptions={props.fieldOptions}
                fieldData={props.fieldData}
                removeItemFunc={() => removeItem(i)}
                watch={watch}
              />
            );
          })}
        </Flex>
        <HStack>
          <Tooltip label="Add Item">
            <IconButton
              colorScheme="green"
              icon={
                <span>
                  <MdAddCircle />
                </span>
              }
              aria-label="Add Item"
              onClick={() => {
                addItem('item', fields.length);
              }}
              variant="ghost"
            />
          </Tooltip>
          {allowGroup ? (
            <Tooltip label="Add Group">
              <IconButton
                colorScheme="blue"
                icon={
                  <span>
                    <MdLibraryAdd />
                  </span>
                }
                aria-label="Add Group"
                onClick={() => {
                  addItem('group', fields.length);
                }}
                variant="ghost"
              />
            </Tooltip>
          ) : null}
        </HStack>
      </Flex>
    </Box>
  );
}

function FilterFormItem(props: {
  prefix: string;
  removeItemFunc: () => void;
  control: Control;
  fieldOptions: { value: FieldData['field']; label: FieldData['label'] }[];
  fieldData: Record<string, FieldData>;
  watch: UseFormWatch<FieldValues>;
}) {
  const fieldValue: DataType = props.watch(`${props.prefix}.field`);
  const fieldType = props.fieldData[fieldValue]?.type || 'string';
  const operatorOptionsMap = operatorMap[fieldType];
  return (
    <HStack>
      <ChakraSelectField
        field={`${props.prefix}.field`}
        control={props.control}
        label={null}
        valueMap={props.fieldOptions}
      />
      <ChakraSelectField
        field={`${props.prefix}.operator`}
        control={props.control}
        label={null}
        valueMap={operatorOptionsMap}
      />
      {fieldType === 'date' ? (
        <ChakraDateField
          field={`${props.prefix}.value`}
          control={props.control}
          label={null}
          placeholder="value"
        />
      ) : (
        <ChakraTextField
          field={`${props.prefix}.value`}
          control={props.control}
          label={null}
          placeholder="value"
        />
      )}
      <Tooltip label="Delete Item">
        <IconButton
          colorScheme="red"
          icon={
            <span>
              <MdDelete />
            </span>
          }
          aria-label="Delete Item"
          onClick={props.removeItemFunc}
          variant="ghost"
        />
      </Tooltip>
    </HStack>
  );
}
