import { HStack, Link, VStack, Text, useBreakpointValue, Image } from "@chakra-ui/react";

export function Footer() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  if (!isWideVersion) {
    return (
      <VStack bgGradient='linear(to-b, blue.500, #305AB1)' color='white' w='100%' mt='auto' minH='100' justify='center' >
        <Text>Pokedex Project Developed by</Text>
        <Link ml='1' display='flex' dir='row' alignItems='center' href='https://github.com/douglassantiagos'>
          Douglas Santiago
          <Image src="github.png" w='5' h='5' ml='1' />
        </Link>
      </VStack>
    )
  }

  return(
    <HStack bgGradient='linear(to-b, blue.500, #305AB1)' color='white' w='100%' mt='auto' minH='100' justify='center' >
      <Text>
        Pokedex Project - Developed by 
      </Text>
      <Link href='https://github.com/douglassantiagos' ml='1' display='flex' dir='row' alignItems='center' >
        Douglas Santiago
        <Image src="github.png" w='5' h='5' ml='1' />
      </Link>
    </HStack>
  )
}