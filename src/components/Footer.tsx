import { HStack, Link, VStack, Text, useBreakpointValue } from "@chakra-ui/react";

export function Footer() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  if (!isWideVersion) {
    return (
      <VStack bgGradient='linear(to-b, blue.500, #305AB1)' w='100%' mt='auto' minH='100' justify='center' >
        <Text color='white'>Pokedex Project</Text>
        <Text color='white'>
          Developed by 
          <Link ml='1' borderBottomWidth='thin' href='https://github.com/douglassantiagos'>
            Douglas Santiago
          </Link>
        </Text>
      </VStack>
    )
  }

  return(
    <HStack bgGradient='linear(to-b, blue.500, #305AB1)' w='100%' mt='auto' minH='100' justify='center' >
      <Text color='white'>
        Pokedex Project - Developed by 
        <Link href='https://github.com/douglassantiagos' ml='1'>
          Douglas Santiago
        </Link>
      </Text>
    </HStack>
  )
}