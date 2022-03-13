import React from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import Navigation from './navigation';
import Calender from './calender';
import AppBar from './appbar';
import LoginForm from './login-form';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const EditableTable = () => {
  return <h1>This is Editable Table</h1>;
};

export default function Main() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar handleDrawerOpen={handleDrawerOpen} open={open} />
      <Navigation handleDrawerClose={handleDrawerClose} open={open} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/calender" element={<Calender />} />
          <Route path="/editable-table" element={<EditableTable />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Box>
    </Box>
  );
}
