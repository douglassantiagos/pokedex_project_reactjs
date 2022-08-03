import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    body: 'Poppins',
    heading: 'Poppins'
  },

  styles: {
    global: {
      body: {
        bg: 'white',
        color: '#2F3133'
      }
    }
  }
})