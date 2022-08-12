import { Box, Text, Stack, Button, Image, useBreakpointValue, FormControl, Select } from "@chakra-ui/react";


export function Sidebar({ handleClickCallback, onListTypeNames, selected, ...rest }) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const handleChange = (event) => {
    handleClickCallback(event.target.value);
  }

  if (!isWideVersion) {
    return (
      <FormControl px={['5', '24']} mb='12'>
        <Select 
          size='lg' 
          variant='outline'
          borderWidth='thin'
          borderColor='gray.300'
          borderRadius='8'
          fontSize='md'
          fontWeight='bold'
          onChange={handleChange}
        >
          <option value='All'>All</option>
          {onListTypeNames.map((name, index) => (
            <option key={index} value={name}>
              {name.charAt(0).toUpperCase() + (name).slice(1)}            
            </option>
          ))}
        </Select>
      </FormControl>
    )
  }

  return (
    <Box as='aside' minW='18%' borderRightWidth={1} borderColor="gray.100">     
      <Stack spacing='4' align='start'>
        <Button
          p='0'
          w='90%'
          bg={selected === 'All' ? 'yellow.400' : 'none'}
          _hover={{transform: 'rotate(0deg) scale(1.05)'}}
          color={selected === 'All' ? '' : 'gray.500'}
          display='flex'
          alignItems='center'
          justifyContent={selected === "All" ? 'center' : 'start'}
          borderWidth={selected === 'All' ? 3 : 0}
          borderColor='blue.500'
          boxShadow={selected === 'All' ? 'lg' : ''}
          onClick={() => handleClickCallback('All')}
          transform={selected === 'All' ? 'rotate(-3deg)' : ''}
          transition={selected === 'All' ? 'transform 200ms ease' : ''}
          {...rest}
        >
          <Image 
            src={selected === 'All' ? '../pokebolaA.png' : '../pokebolaS.png'}
            alt='pokeball'
            w={selected === 'All' ? '7' : '5'} 
            h={selected === 'All' ? '7' : '5'}  
          />
      
          <Text 
            ml={selected === 'All' ? '3' : '5'}  
            fontWeight={selected === 'All' ? 'bold' : 'hairline'}
          >              
            All
          </Text>
        </Button>  

        {onListTypeNames.map((name, index) => (
          <Button
            key={index}
            p='0'
            w='90%'
            bg={selected === name ? 'yellow.400' : 'none'}
            _hover={selected === name ? { transform: 'rotate(0deg) scale(1.05)' } : { bg: 'gray.100', color: 'black', transform: 'rotate(0deg) scale(1.05)' }}
            color={selected === name ? '' : 'gray.500'}
            display='flex'
            alignItems='center'
            justifyContent={selected === name ? 'center' : 'start'}
            borderWidth={selected === name ? 3 : 0}
            borderColor='blue.500'
            boxShadow={selected === name ? 'lg' : ''}
            transform={selected === name ? 'rotate(-3deg)' : ''}
            transition={selected === name ? 'transform 200ms ease' : ''}
            onClick={() => handleClickCallback(name)}
            {...rest}
          >
            <Image 
              src={selected === name ? '../pokebolaA.png' : '../pokebolaS.png'}
              alt='pokeball'
              w={selected === name ? '7' : '5'}
              h={selected === name ? '7' : '5'} 
            />

            <Text 
              ml={selected === name ? '3' : '5'} 
              fontWeight={selected === name ? 'bold' : 'hairline'}
            >
              {name.charAt(0).toUpperCase() + (name).slice(1)}
            </Text>
          </Button>        
        ))}
      </Stack>
    </Box>
  )
}
