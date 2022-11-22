import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Box, Button, Flex, Heading, HStack, Spacer } from '@chakra-ui/react';
import StateManager from '../state/context';
import { clearGetCredential } from '../state/credential/action';

export default function AppBar(props: { open: boolean }) {
  const drawerWidth = 240;
  return (
    <Box
      as="header"
      boxShadow="lg"
      width={props.open ? `calc(100% - ${drawerWidth}px)` : '100%'}
      zIndex="banner"
      bgColor="baseBlue"
      py="1"
      position="fixed"
      h="64px"
      ml={props.open ? `${drawerWidth}px` : '0'}
      sx={{
        transitionProperty: 'width, margin',
        transitionDuration: '200ms',
        transitionTimingFunction: 'linear',
      }}
    >
      <Flex justify="space-between" pl="2" pr="2">
        {props.open ? null : (
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Heading as="h4" size="md" textAlign="center">
              React Sandbox
            </Heading>
          </Link>
        )}
        <Spacer />
        <HStack spacing="3">
          <Logout />
        </HStack>
      </Flex>
    </Box>
  );
}

function Logout() {
  const [clicked, setClicked] = React.useState(false);
  const { dispatch } = React.useContext(StateManager);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (clicked) navigate('/');
  }, [clicked]);
  const handleLogout = () => {
    dispatch(clearGetCredential());
    setClicked(true);
  };
  return (
    <Button type="button" colorScheme="teal" onClick={handleLogout}>
      Logout
    </Button>
  );
}
