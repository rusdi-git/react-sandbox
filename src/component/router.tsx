import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

import { Link as ChakraLink, Button, ThemingProps, ColorProps, Icon } from '@chakra-ui/react';

import StateManager from '../state/context';
import { IconType } from 'react-icons';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const state = React.useContext(StateManager).state;
  const location = useLocation();
  if (!state.credential?.token) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

export function ListItemLink(props: { to: string; children: React.ReactNode }) {
  return (
    <ChakraLink
      as={Link}
      to={props.to}
      textDecoration="none"
      py="2"
      px="4"
      display="flex"
      _hover={{ backgroundColor: 'gray.200' }}
    >
      {props.children}
    </ChakraLink>
  );
}

export const IconLink = (props: { color: ColorProps['color']; to: string; icon: IconType }) => {
  return (
    <ChakraLink as={Link} to={props.to} textDecoration="none">
      <Icon as={props.icon} color={props.color} boxSize={6} />
    </ChakraLink>
  );
};
