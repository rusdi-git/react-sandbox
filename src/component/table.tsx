import React, { createContext, useContext } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import {
  PaginatedTableBasicData,
  PaginatedTableColumnType,
  PaginatedTableCell,
  PaginatedTableRow,
  PaginatedTableType,
} from './type';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

interface ITableStateContext {
  linkField?: string;
  urlFunc?: (val: string) => string;
}

const TableStateContext = createContext<ITableStateContext>({});

function PaginatedTableBodyCell<T extends PaginatedTableBasicData, K extends keyof T>(
  props: PaginatedTableCell<T, K>
) {
  const { linkField, urlFunc } = useContext(TableStateContext);
  const align = typeof props.value === 'number' ? 'right' : 'left';
  if (linkField && urlFunc && props.field === linkField) {
    return (
      <TableCell align={align} variant="body">
        <Link to={urlFunc(props.idValue)}>{props.value}</Link>
      </TableCell>
    );
  }

  return (
    <TableCell align={align} variant="body">
      {props.value}
    </TableCell>
  );
}

function PaginatedTableBodyRow<T extends PaginatedTableBasicData, K extends keyof T>(
  props: PaginatedTableRow<T, K>
) {
  const cellData = props.columns.map((c: PaginatedTableColumnType<K>) => {
    const field = c.field;
    const value = props.data[field];
    return (
      <PaginatedTableBodyCell<T, K>
        value={value}
        key={`${props.data.id}-${c.field}`}
        field={c.field as string}
        idValue={props.data.id}
        type={c.type}
      />
    );
  });
  return <TableRow hover>{React.Children.toArray(cellData)}</TableRow>;
}

export default function PaginatedTable<T extends PaginatedTableBasicData, K extends keyof T>(
  props: PaginatedTableType<T, K>
) {
  const cellHeaders = props.columns.map((c, i) => (
    <TableCell
      variant="head"
      sx={{ backgroundColor: 'primary.dark', color: 'common.white' }}
      key={`amn-head-${i}`}
    >
      {c.label}
    </TableCell>
  ));
  const bodyRows = props.data.map((item, i) => (
    <PaginatedTableBodyRow columns={props.columns} data={item} key={`amn-row-${i}`} />
  ));
  return (
    <TableStateContext.Provider
      value={{
        linkField: props.linkField,
        urlFunc: props.urlFunc,
      }}
    >
      <TableContainer component={Paper}>
        {props.isLoading ? (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        ) : null}
        <Table stickyHeader aria-label="data-table">
          <TableHead>
            <TableRow>{React.Children.toArray(cellHeaders)}</TableRow>
          </TableHead>
          <TableBody>{React.Children.toArray(bodyRows)}</TableBody>
        </Table>
        {props.page !== 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px' }}>
            <Pagination
              count={props.total}
              page={props.page}
              onChange={(e, v) => {
                props.changePage?.(v);
              }}
              variant="outlined"
              shape="rounded"
              color="primary"
            />
          </Box>
        ) : null}
      </TableContainer>
    </TableStateContext.Provider>
  );
}
