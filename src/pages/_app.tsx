import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import {  AnimateSharedLayout, AnimatePresence } from 'framer-motion'

import { theme } from '../styles/theme'
import '../styles/styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimateSharedLayout type="crossfade">
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AnimateSharedLayout>
  )
}

export default MyApp
