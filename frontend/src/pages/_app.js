import '../../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'

/**
 * Contains the logic for the whole app.
 * @param {*} param0 
 */
function MyApp({ Component, pageProps }) {
  return (<ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>)
}

export default MyApp
