import React from 'react';
import { useForm, Control } from 'react-hook-form';

import { usePersons } from '../data/person';
import { PersonData } from '../data/type';
import ChakraTable from '../component/table-chakra';
import { ColumnType, FieldData, GroupSchema } from '../component/type';
import { Box, Button, CircularProgress, Heading, HStack, Text } from '@chakra-ui/react';
import ChakraTextField from '../component/form/text-field';
import { get } from 'lodash';
import { useUrlParams } from '../helper/router';
import FilterForm from '../component/filter-form';

export default function PersonTable() {
  const [localState, setLocalState] = React.useState({ advanceFilterOpen: false });
  const { setParams, getParams } = useUrlParams();
  const pageParams = getParams('page', 1) as number;
  const query = getParams('query', {}) as unknown as GroupSchema;
  const { data, error, isLagging } = usePersons({
    limit: 10,
    offset: (pageParams - 1) * 10,
    query,
  });
  const changePage = (val: number) => {
    setParams('page', val);
  };

  const searchPerson = (params: GroupSchema) => {
    setParams('query', params);
  };
  const toggleAdvancedFilter = () => {
    setLocalState({ advanceFilterOpen: !localState.advanceFilterOpen });
  };

  const columns: ColumnType<keyof PersonData>[] = [
    { field: 'name', label: 'Nama' },
    { field: 'phoneNumber', label: 'Telepon' },
    { field: 'email', label: 'Email' },
    { field: 'address', label: 'Alamat' },
    { field: 'job', label: 'Pekerjaan' },
  ];
  const fields: FieldData[] = [
    { field: 'name', label: 'Name', type: 'string' },
    { field: 'phoneNumber', label: 'Telepon', type: 'string' },
    { field: 'email', label: 'Email', type: 'string' },
    { field: 'address', label: 'Alamat', type: 'string' },
    { field: 'job', label: 'Pekerjaan', type: 'string' },
  ];
  if (error) return <Text>Error</Text>;

  return (
    <Box>
      <Heading>Rekap Biodata</Heading>
      <FilterForm
        open={localState.advanceFilterOpen}
        toggleOpen={toggleAdvancedFilter}
        fieldOptions={fields}
        defaultValue={query}
        handleSubmit={searchPerson}
      />
      {!data ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress isIndeterminate />
        </Box>
      ) : (
        <Box>
          <HStack>
            <SeacrhByName value={query as GroupSchema} handleSubmit={searchPerson} />
            <Button onClick={toggleAdvancedFilter} ml="2">
              Advanced Filter
            </Button>
          </HStack>
          <ChakraTable
            data={data?.data ?? []}
            columns={columns}
            page={pageParams}
            changePage={changePage}
            total={data?.total || 0}
            isLoading={data === undefined || isLagging}
          />
        </Box>
      )}
    </Box>
  );
}

function SeacrhByName(props: { value: GroupSchema; handleSubmit: (params: GroupSchema) => void }) {
  const firstItem = get(props.value, 'items.0', {});
  const { control, handleSubmit } = useForm({
    defaultValues: { value: firstItem.field === 'name' ? firstItem.value : '' },
  });
  const submit = async (data: { value: string }) => {
    await props.handleSubmit({
      type: 'group',
      operator: 'or',
      items: [
        { type: 'item', field: 'name', operator: 'ilike', value: data.value },
        { type: 'item', field: 'phoneNumber', operator: 'like', value: data.value },
      ],
    });
  };
  return (
    <Box as="form" onSubmit={handleSubmit(submit)} noValidate display="flex">
      <ChakraTextField
        field="value"
        control={control as unknown as Control}
        label={null}
        placeholder="Search"
      />
      <Button type="submit" ml="2">
        Search
      </Button>
    </Box>
  );
}
