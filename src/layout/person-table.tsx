import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { PaginatedTableColumnType } from '../component/type';
import { getPersons } from '../data/person';
import { PersonData } from '../data/type';
import { useFetchList } from '../helper/use-fetch';
import PaginatedTable from '../component/table';

export default function PersonTable() {
  const { state, changeOffset } = useFetchList(
    async (limit: number, offset: number) => {
      return await getPersons({ limit, offset });
    },
    10,
    0
  );
  const columns: PaginatedTableColumnType<keyof PersonData>[] = [
    { field: 'name', label: 'Nama' },
    { field: 'phoneNumber', label: 'Telepon' },
    { field: 'email', label: 'Email' },
    { field: 'address', label: 'Alamat' },
    { field: 'job', label: 'Pekerjaan' },
  ];
  const changePage = (val: number) => {
    changeOffset((val - 1) * 10);
  };
  return (
    <Paper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <h1>Rekap Biodata</h1>
        </Box>
      </Box>
      {state.isLoading && !state.data ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <PaginatedTable
          data={state.data ?? []}
          columns={columns}
          page={state.offset / state.limit + 1}
          changePage={changePage}
          total={Math.ceil(state.total / state.limit)}
          isLoading={state.isLoading}
        />
      )}
    </Paper>
  );
}
