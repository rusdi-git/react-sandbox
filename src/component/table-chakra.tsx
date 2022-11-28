import { Td, Th, Tr, Thead, Tbody, Table, TableContainer, Box, Progress } from '@chakra-ui/react';
import React, { createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../helper/general';
import { BasicData, TableCell, TableType, TableRow } from './type';
import Pagination from '../component/pagination';

interface ITableStateContext {
  linkField?: string;
  urlFunc?: (val: string) => string;
}

const TableStateContext = createContext<ITableStateContext>({});

function ChakraBodyCell<T extends BasicData>(props: TableCell<T>) {
  const { linkField, urlFunc } = useContext(TableStateContext);
  const align = typeof props.value === 'number' ? 'right' : 'left';
  const value =
    props.type === 'currency' && typeof props.value === 'number'
      ? formatCurrency(props.value)
      : props.value;
  if (linkField && urlFunc && props.field === linkField) {
    return (
      <Td align={align}>
        <Link to={urlFunc(props.idValue)}>{value}</Link>
      </Td>
    );
  }
  return <Td align={align}>{value}</Td>;
}

function ChakraBodyRow<T extends BasicData>(props: TableRow<T>) {
  const cellData = props.columns.map((c) => {
    const field = c.field;
    const value = props.data[field];
    return (
      <ChakraBodyCell<T>
        value={value}
        key={`amn-cell-${props.data.id}-${String(c.field)}`}
        field={c.field as string}
        idValue={props.data.id}
        type={c.type}
      />
    );
  });
  return <Tr _hover={{ backgroundColor: 'hoverGray' }}>{React.Children.toArray(cellData)}</Tr>;
}

export default function ChakraTable<T extends BasicData>(props: TableType<T>) {
  const cellHeaders = props.columns.map((c, i) => (
    <Th key={`amn-header-cell-${i}`} bg="baseGreen" color="white">
      {c.label}
    </Th>
  ));
  const bodyRows = props.data.map((item, i) => (
    <ChakraBodyRow columns={props.columns} data={item} key={`amn-row-${i}`} />
  ));
  return (
    <TableStateContext.Provider value={{ linkField: props.linkField, urlFunc: props.urlFunc }}>
      <TableContainer>
        {props.isLoading ? (
          <Box width="100%">
            <Progress colorScheme="teal" size="xs" isIndeterminate />
          </Box>
        ) : null}
        <Table aria-label="data-table">
          <Thead>
            <Tr>{React.Children.toArray(cellHeaders)}</Tr>
          </Thead>
          <Tbody>{React.Children.toArray(bodyRows)}</Tbody>
        </Table>
        {props.page !== 0 ? (
          <Box display="flex" justifyContent="flex-end" mt="4px" py="4px">
            {/* <Pagination
              current={props.page}
              total={props.total}
              pageNeighbours={2}
              onChange={(page) => {
                if (page) props.changePage?.(page);
              }}
              paginationProps={{ display: 'flex', color: 'white' }}
              baseStyles={{ bg: 'baseGreen' }}
              activeStyles={{ bg: 'activeBlue' }}
              hoverStyles={{ bg: 'hoverGreen' }}
            />
          </Box> */}
            <Pagination
              total={props.total}
              currentPage={props.page}
              handlePageChange={(page) => {
                if (page) props.changePage?.(page);
              }}
            />
          </Box>
        ) : null}
      </TableContainer>
    </TableStateContext.Provider>
  );
}
