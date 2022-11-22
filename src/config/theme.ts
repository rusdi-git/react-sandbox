import React from 'react';
import { ColorProps, extendTheme } from '@chakra-ui/react';

interface Theme {
  semanticTokens: {
    colors: { [x: string]: ColorProps['color'] };
  };
}

const themeData: Theme = {
  semanticTokens: {
    colors: {
      base: 'gray.50',
      hoverGray: 'gray.200',
      baseGreen: 'green.400',
      hoverGreen: 'green.600',
      baseBlue: 'blue.300',
      activeBlue: 'blue.400',
    },
  },
};

const theme = extendTheme(themeData);

export default theme;
