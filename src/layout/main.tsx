import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Navigation from './navigation';
import Calendar from './calendar';
import AppBar from './appbar';
import { Box, Flex } from '@chakra-ui/react';
import LoginForm from './login-form';
import PersonTable from './person-table';
import ArrayForm from './array-form';
import Home from './home';
import { ProtectedRoute } from '../component/router';
import PrivatePage from './private-page';

export default function Main() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Flex>
      <AppBar open={open} />
      <Navigation toggleDrawer={toggleDrawer} open={open} />
      <Box flexGrow={1} marginTop="64px" padding="24px" overflow="scroll">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/paginated-table" element={<PersonTable />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/private-page"
            element={
              <ProtectedRoute>
                <PrivatePage />
              </ProtectedRoute>
            }
          />
          <Route path="/array-form" element={<ArrayForm />} />
        </Routes>
      </Box>
    </Flex>
  );
}
