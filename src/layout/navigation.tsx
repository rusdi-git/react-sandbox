import React from 'react';
import { Link } from 'react-router-dom';

import {
  Flex,
  Box,
  Divider,
  List,
  ListItem,
  ListIcon,
  IconButton,
  Container,
  Icon,
  Text,
  Heading,
} from '@chakra-ui/react';
import {
  MdChevronLeft,
  MdChevronRight,
  MdCalendarToday,
  MdLogin,
  MdTableView,
  MdDynamicForm,
} from 'react-icons/md';
import { ListItemLink } from '../component/router';
import { NavigationProps } from './type';

export default function Navigation(props: NavigationProps) {
  return (
    <Flex
      width={props.open ? '240px' : '80px'}
      flexDirection="column"
      overflowX="hidden"
      minHeight="600px"
      sx={{
        transitionProperty: 'width',
        transitionDuration: '200ms',
        transitionTimingFunction: 'linear',
      }}
      borderRight="1px"
      borderRightColor="gray.200"
    >
      <Box h="64px" width="240px" overflowX="hidden" layerStyle="base">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Heading as="h4" size="md" textAlign="center">
            React Sandbox
          </Heading>
        </Link>
      </Box>
      <Divider />
      <Box paddingTop="15px">
        <List>
          <ListItem>
            <ListItemLink to="/calendar">
              <ListIcon as={MdCalendarToday} minWidth="56px" />
              <Text>Calendar</Text>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink to="/paginated-table">
              <ListIcon as={MdTableView} minWidth="56px" />
              <Text>Paginated Table</Text>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink to="/login">
              <ListIcon as={MdLogin} minWidth="56px" />
              <Text>Login</Text>
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink to="/array-form">
              <ListIcon as={MdDynamicForm} minWidth="56px" />
              <Text>Array Form</Text>
            </ListItemLink>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Container pt="10" pb="2" centerContent>
        <IconButton
          aria-label="toggle-drawer"
          icon={<Icon as={props.open ? MdChevronLeft : MdChevronRight} />}
          onClick={() => {
            props.toggleDrawer();
          }}
        />
      </Container>
    </Flex>
  );
}
