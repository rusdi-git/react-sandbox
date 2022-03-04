import React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EventIcon from '@mui/icons-material/Event';
import TableViewIcon from '@mui/icons-material/TableView';
import IconButton from '@mui/material/IconButton';
import MuiDrawer from '@mui/material/Drawer';
import { Link } from 'react-router-dom';

type NavigationType = {
  open: boolean;
  handleDrawerClose: () => void;
};

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Navigation(props: NavigationType) {
  const theme = useTheme();
  return (
    <Drawer variant="permanent" open={props.open}>
      <DrawerHeader>
        <IconButton onClick={props.handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <Link to="/calender" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
          <ListItem>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText>Calendar</ListItemText>
          </ListItem>
        </Link>
        <Link
          to="/editable-table"
          style={{ textDecoration: 'none', color: theme.palette.text.primary }}
        >
          <ListItem>
            <ListItemIcon>
              <TableViewIcon />
            </ListItemIcon>
            <ListItemText>Editable-Table</ListItemText>
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}
