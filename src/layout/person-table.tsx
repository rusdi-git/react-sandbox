import React from 'react';

import { getPersons } from '../data/person';
import { PersonData } from '../data/type';
import { useFetchList } from '../helper/use-fetch';
import ChakraTable from '../component/table-chakra';
import { ColumnType } from '../component/type';
import { Box, CircularProgress, Flex, Heading } from '@chakra-ui/react';

export default function PersonTable() {
  const { state, changePage } = useFetchList(async (limit: number, offset: number) => {
    return await getPersons({ limit, offset });
  });
  const columns: ColumnType<keyof PersonData>[] = [
    { field: 'name', label: 'Nama' },
    { field: 'phoneNumber', label: 'Telepon' },
    { field: 'email', label: 'Email' },
    { field: 'address', label: 'Alamat' },
    { field: 'job', label: 'Pekerjaan' },
  ];

  return (
    <Box>
      <Heading>Rekap Biodata</Heading>
      {state.isLoading && !state.data ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress isIndeterminate />
        </Box>
      ) : (
        <ChakraTable
          data={state.data ?? []}
          columns={columns}
          page={state.page}
          changePage={changePage}
          total={state.total}
          isLoading={state.isLoading}
        />
      )}
    </Box>
  );
}
