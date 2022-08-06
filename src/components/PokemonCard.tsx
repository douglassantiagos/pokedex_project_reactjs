import { useEffect, useState } from "react";
import { Button, Flex, HStack, Image, Stack, Text, useDisclosure, Link, useBreakpointValue } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion"

import { formattedID } from "../utils/formattedID";
import { typeColors } from "../utils/typeColors";
import Modal from "./Modal";

export type ColorsData = {
  primary: string;
}

export function PokemonCard({ onPokemonData }) {
  const [colors, setColors] = useState<ColorsData>({} as ColorsData)
  const [allTypesData, setAllTypesData] = useState([])  
  const [selectedId, setSelectedId] = useState(null)

  async function getTypesNameData() {      
    const promisesTypesData = await onPokemonData.types.map((item) => item.type.name); 
    const typesData = await Promise.all(promisesTypesData);

    setAllTypesData(typesData);
    setColors(typeColors(typesData))
  }
  
  useEffect(() => {  
    getTypesNameData();

  }, [onPokemonData])

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      },
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    },
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  if (!isWideVersion) {
    return (
      <>    
        <motion.button 
          layoutId={`card-container-${onPokemonData.id}`} 
          onClick={() => setSelectedId(onPokemonData.id)}
          variants={container} 
          initial="hidden" 
          animate="visible" 
          whileHover={{ scale: 1.1 }} 
        >
          <Stack direction='column' maxW='230' bg={colors.primary} borderRadius='16' p='2' shadow='md'>
            <HStack justify='space-between'>
              <Flex>
                <Text fontSize='sm' color='white' fontWeight='normal' bg='whiteAlpha.300' w='auto' borderRadius='20' p='1' px='4'>   
                  {(allTypesData[0]+ ' ').charAt(0).toUpperCase() + 
                  (allTypesData[0]+ ' ').slice(1)}           
                </Text>
                {allTypesData[1] === undefined ? null :
                  <Text fontSize='sm' color='white' fontWeight='normal' ml='1' bg={allTypesData[1] === 'undefined' ? null : 'whiteAlpha.300'} w='auto' borderRadius='20' p='1' px='4'>   
                    {(allTypesData[1]).charAt(0).toUpperCase() + 
                    (allTypesData[1]).slice(1)}         
                  </Text>            
                }
              </Flex>              
            </HStack>
            
            <Flex
              m='auto' 
              w='100%'
              justifyContent='center' 
              bgImage="./pokeballBg.svg" 
              bgPosition='center'
              bgRepeat='no-repeat'
              bgSize='cover'
            >
              <motion.img
                variants={item}
                src={onPokemonData.image} 
                style={{ maxWidth: '100%', maxHeight: 170, padding: 2, marginTop: 8, justifyContent: 'center'}}
              />
            </Flex>

            <Flex direction='column' align='center' bg='whiteAlpha.300' py='2' boxShadow='md' borderRadius='10' >
              <Text textAlign='start' fontSize='smaller' fontWeight='medium'>
                {formattedID(onPokemonData.id)}
              </Text>
              <Text fontWeight='bold'>
                {onPokemonData.name.charAt(0).toUpperCase() + 
                (onPokemonData.name).slice(1)}
              </Text>
            </Flex> 
          </Stack>
        </motion.button>

        <AnimatePresence>
          {selectedId && (
            <motion.button layoutId={selectedId} onClick={() => setSelectedId(null)}>
              <Modal data={onPokemonData} onType={allTypesData} colors={colors} />
            </motion.button>
          )}
        </AnimatePresence>
      </>
    )
  }

  return (
    <>    
      <motion.button 
        layoutId={`card-container-${onPokemonData.id}`} 
        onClick={() => setSelectedId(onPokemonData.id)}
        variants={container} 
        initial="hidden" 
        animate="visible" 
        whileHover={{ scale: 1.1 }} 
      >
        <Stack direction='column' minW='290' minH='300' bg={colors.primary} borderRadius='16' p='2' shadow='md'>
          <HStack justify='space-between'>
            <Flex>
              <Text fontSize='sm' color='white' fontWeight='normal' bg='whiteAlpha.300' w='auto' borderRadius='20' p='1' pl='4' pr='4' >   
                {(allTypesData[0]+ ' ').charAt(0).toUpperCase() + 
                (allTypesData[0]+ ' ').slice(1)}           
              </Text>
              {allTypesData[1] === undefined ? null :
                <Text fontSize='sm' color='white' fontWeight='normal' ml='1' bg={allTypesData[1] === 'undefined' ? null : 'whiteAlpha.300'} w='auto' borderRadius='20' p='1' px='4'>   
                  {(allTypesData[1]).charAt(0).toUpperCase() + 
                  (allTypesData[1]).slice(1)}         
                </Text>            
              }
            </Flex>

            <Text textAlign='start' pr='2' fontSize='smaller' fontWeight='medium'>
              {formattedID(onPokemonData.id)}
            </Text>
          </HStack>
          
          <Flex
            m='auto' 
            w='200' 
            h='200' 
            justifyContent='center' 
            bgImage="./pokeballBg.svg" 
            bgPosition='center'
            bgRepeat='no-repeat'
            bgSize='cover'
          >
            <motion.img
              variants={item}
              src={onPokemonData.image} 
              style={{ maxWidth: '70%', maxHeight: 170, padding: 2, marginTop: 8, justifyContent: 'center'}}
            />
          </Flex>

          <Flex direction='column' align='center' bg='whiteAlpha.300' p='5' boxShadow='md' borderRadius='10' >
            <Text fontWeight='bold'>
              {onPokemonData.name.charAt(0).toUpperCase() + 
              (onPokemonData.name).slice(1)}
            </Text>
          </Flex> 
        </Stack>
      </motion.button>

      <AnimatePresence>
        {selectedId && (
          <motion.button layoutId={selectedId} onClick={() => setSelectedId(null)}>
            <Modal data={onPokemonData} onType={allTypesData} colors={colors} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}