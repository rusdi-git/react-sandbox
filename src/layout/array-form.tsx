import React from 'react';
import { useForm, useFieldArray, Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { getPersonByName } from '../data/person';

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { MdDelete, MdAddCircle } from 'react-icons/md';

import ChakraAutoCompleteField from '../component/form/autocomplete-field';
import ChakraDateField from '../component/form/date-field';
import ChakraRadioField from '../component/form/radio-field';
import ChakraTextField from '../component/form/text-field';
import ChakraSelectField from '../component/form/select-field';
import ChakraNumberFormatField from '../component/form/number-format-field';
import { getProgramName } from '../data/program';

const schema = z.object({
  id: z.string().min(1),
  date: z.date(),
  method: z.enum(['t', 'c']),
  details: z
    .object({
      program: z.string(),
      nominal: z.preprocess((arg) => {
        return typeof arg === 'string' ? parseInt(arg) : arg;
      }, z.number()),
    })
    .array(),
  customError: z.string().optional(),
});
type TransactionFormSchema = z.infer<typeof schema>;

interface AutoCompletePersonData {
  id: string;
  name: string;
  phoneNumber: string | null;
  email: string;
}

interface TransactionFormLocalState {
  addField: number;
  removeFieldIndex: number | null;
  removeIndexInc: number;
  personData: AutoCompletePersonData | null;
  transactionOptions: { value: string; label: string }[];
}

export default function ArrayForm() {
  const [localState, setLocalState] = React.useState<TransactionFormLocalState>({
    addField: 0,
    removeFieldIndex: null,
    removeIndexInc: 0,
    personData: null,
    transactionOptions: [],
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      id: '',
      date: new Date(),
      method: '' as 'c',
      details: [
        {
          program: '',
          nominal: 0,
        },
      ],
    },
    reValidateMode: 'onSubmit',
  });
  const { fields, append, remove } = useFieldArray({ name: 'details', control });
  const detailFields = [
    { label: 'Program', width: '30%' },
    { label: 'Nominal', width: '30%' },
    { label: '', width: '10%' },
  ];

  const addDetail = () => {
    setLocalState({ ...localState, addField: localState.addField + 1 });
  };

  const removeDetail = (index: number) => {
    setLocalState({
      ...localState,
      removeFieldIndex: index,
      removeIndexInc: localState.removeIndexInc + 1,
    });
  };

  const setPersonData = (data: AutoCompletePersonData) => {
    setLocalState({ ...localState, personData: data });
  };
  React.useEffect(() => {
    const getPrograms = async () => {
      const programs = await getProgramName(5);
      setLocalState({ ...localState, transactionOptions: programs });
    };
    getPrograms();
  }, []);

  React.useEffect(() => {
    if (localState.addField) {
      append({
        program: '',
        nominal: 0,
      });
    }
  }, [localState.addField]);

  React.useEffect(() => {
    if (localState.removeFieldIndex !== null && localState.removeIndexInc && fields.length > 1) {
      remove(localState.removeFieldIndex);
    }
  }, [localState.removeIndexInc]);

  React.useEffect(() => {
    if (localState.personData) setValue('id', localState.personData.id);
  }, [localState.personData?.id]);

  React.useEffect(() => {
    if (isSubmitSuccessful) console.log('Success');
  }, [isSubmitSuccessful]);

  const submitData = async (data: TransactionFormSchema) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(data);
        return resolve(true);
      }, Math.random() * 2000);
    });
  };

  return (
    <Flex marginTop="4px" alignItems="center" flexDirection="column" p="2">
      <Box as="form" width="100%" onSubmit={handleSubmit(submitData)} noValidate>
        {isSubmitSuccessful ? (
          <Alert status="success">
            <AlertIcon />
            Submitted
          </Alert>
        ) : null}
        <Grid templateColumns="1fr 1fr" gap={1}>
          <GridItem colSpan={1}>
            <ChakraAutoCompleteField<AutoCompletePersonData>
              fetchData={getPersonByName}
              labelKey="name"
              label="Find Person"
              field="id"
              triggerEffectValue={setPersonData}
              currentInputSource="name"
            />
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input value={localState.personData?.email || ''} readOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input value={localState.personData?.phoneNumber || ''} readOnly />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <ChakraDateField
              field="date"
              label="Date"
              control={control as unknown as Control}
              error={errors.date}
            />
            <ChakraRadioField
              field="method"
              label="Transaction Method"
              control={control as unknown as Control}
              error={errors.method}
              valueMap={[
                { value: 'c', label: 'Cash' },
                { value: 't', label: 'Transfer' },
              ]}
            />
          </GridItem>
        </Grid>
        <Box>
          <Table>
            <Thead>
              <Tr>
                {detailFields.map((i) => (
                  <Th key={`detail-header-${i.label}`}>{i.label}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {fields.map((field, i) => {
                return (
                  <Tr key={field.id}>
                    <Td>
                      <ChakraSelectField
                        field={`details.${i}.program`}
                        control={control as unknown as Control}
                        label={null}
                        valueMap={localState.transactionOptions}
                      />
                    </Td>
                    <Td>
                      <ChakraNumberFormatField
                        field={`details.${i}.nominal`}
                        control={control as unknown as Control}
                        label={null}
                      />
                    </Td>
                    <Td>
                      <IconButton
                        colorScheme="red"
                        icon={<MdDelete />}
                        aria-label="Delete Detail"
                        onClick={() => removeDetail(i)}
                        variant="ghost"
                      />
                    </Td>
                  </Tr>
                );
              })}
              <Tr>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td>
                  <IconButton
                    colorScheme="green"
                    icon={<MdAddCircle />}
                    aria-label="Add Detail"
                    onClick={addDetail}
                    variant="ghost"
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Button type="submit" colorScheme="green" width="100%">
          Submit
        </Button>
      </Box>
    </Flex>
  );
}
