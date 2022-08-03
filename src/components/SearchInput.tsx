import { Flex, Input, Text, useBreakpointValue } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'

interface SearchInputProps {
  onHandleSubmit: (props) => void;
  onHandleChange: (props) => void;
}

export function SearchInput({ onHandleSubmit, onHandleChange }: SearchInputProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  if (!isWideVersion) {
    return (
      <Flex bg='gray.100' w='100%'>
        <Flex justify='center' align='center' w='100%' mx='auto' p='6'>
          <form onSubmit={onHandleSubmit}>
            <Flex bg='white' p='2' borderRadius='full' border='none' align='center'>
              <Input
                type="text"
                placeholder='Search pokemon name or id'
                bg='white'
                border='none'
                w={['78vw', '65vw']}    
                focusBorderColor='none'
                onChange={onHandleChange}
              />        

              <SearchIcon color='blue.300' w={5} h={5} style={{ marginRight: 10 }}   />
            </Flex>
          </form>
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex bg='gray.100' w='100%'>
      <Flex justify='space-between' align='center' w='100%' maxWidth={[900, 900, 900, 900, 1230]} mx='auto' py='6' px={['10','10','10','6']}>        

        <Text fontSize='2xl' fontWeight='bold'>
          Select your pokémon
        </Text>

        <form onSubmit={onHandleSubmit}>
          <Flex bg='white' p='2' borderRadius='full' border='none' align='center'>
            <Input
              type="text"
              placeholder='Search name or id'
              bg='white'
              border='none'  
              w='50vh'     
              focusBorderColor='none'
              onChange={onHandleChange}
            />        

            <SearchIcon color='blue.300' w={5} h={5} style={{ marginRight: 10 }}   />
          </Flex>
        </form>
      </Flex>
    </Flex>
  )
}