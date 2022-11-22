import React from 'react';
import { Box } from '@chakra-ui/react';

export default function AvatarWrapper(props: { children?: React.ReactChild }) {
  return (
    <Box
      bg="green.400"
      p="5px"
      borderRadius="50"
      width="40px"
      height="40px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {props.children}
    </Box>
  );
}
