import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '../styles/theme'
import '../styles/styles.scss'
import { LayoutGroup } from 'framer-motion'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutGroup>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </LayoutGroup>
  )
}

export default MyApp
