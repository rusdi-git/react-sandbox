import React from 'react';

import { usePersons } from '../data/person';
import { PersonData } from '../data/type';
import ChakraTable from '../component/table-chakra';
import { ColumnType } from '../component/type';
import { Box, CircularProgress, Heading, Text } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

export default function PersonTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParams = Number(searchParams.get('page') || 1);
  const { data, error, isLagging } = usePersons({ limit: 10, offset: (pageParams - 1) * 10 });
  const changePage = (val: number) => {
    setSearchParams({ page: String(val) });
  };
  const columns: ColumnType<keyof PersonData>[] = [
    { field: 'name', label: 'Nama' },
    { field: 'phoneNumber', label: 'Telepon' },
    { field: 'email', label: 'Email' },
    { field: 'address', label: 'Alamat' },
    { field: 'job', label: 'Pekerjaan' },
  ];
  if (error) return <Text>Error</Text>;

  return (
    <Box>
      <Heading>Rekap Biodata</Heading>
      {!data ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress isIndeterminate />
        </Box>
      ) : (
        <ChakraTable
          data={data?.data ?? []}
          columns={columns}
          page={pageParams}
          changePage={changePage}
          total={data?.total || 0}
          isLoading={data === undefined || isLagging}
        />
      )}
    </Box>
  );
}
