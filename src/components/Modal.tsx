import { useEffect, useState } from 'react';
import { Flex, Stack, Text, HStack, VStack } from '@chakra-ui/react';
import { motion } from "framer-motion"
import { typeColors } from '../utils/typeColors';
import { formattedID } from '../utils/formattedID';
import { getTypeData } from '../services';

export type ColorsData = {
  primary: string;
}

export default function Modal({ data, onType }) { 
  const [colors, setColors] = useState<ColorsData>({} as ColorsData)
  const [ability, setAbility] = useState([])
  const [weakness, setWeakness] = useState([])
  const [statName, setStatName] = useState([])
  const [amountStat, setAmountStat] = useState([])

  async function getTypesNameData() {      
    const promisesTypesData = await data.types.map((item) => item.type.name);
    const typesData = await Promise.all(promisesTypesData);

    setColors(typeColors(typesData))
  }

  async function getAbilitiesNameData() {
    const promisesAbilitiesData = await data.abilities.map((item) => item.ability.name)
    const abilitiesData = await Promise.all(promisesAbilitiesData)

    setAbility(abilitiesData)
  }

  async function getWeaknessesData() { 
    const promisesEachTypeData = await data.types.map((item) => getTypeData(item.type.url)); // recebo url de cada tipo
    const eachTypeData = await Promise.all(promisesEachTypeData);
    const listWeaknessesData = eachTypeData.map((item) => item.damage_relations.double_damage_from);    
    const weaknessesNameData = listWeaknessesData[0].map((item) => item.name);

    setWeakness(weaknessesNameData);
  }

  async function getStatsData() {
    const promisesStatsData = await data.stats.map((item) => item.stat.name)
    const statsNameData = await Promise.all(promisesStatsData)
    setStatName(statsNameData)

    const promisesAmountStatsData = await data.stats.map((item) => item.base_stat)
    const amountStatsData = await Promise.all(promisesAmountStatsData)
    setAmountStat(amountStatsData)

    console.log('STATS: ', amountStatsData)
  }
  
  useEffect(() => {  
    getTypesNameData();
    getAbilitiesNameData();
    getWeaknessesData();
    getStatsData()
  }, [])

  // function formatedWeight(data) {
  //   const str = data.toString().split(".")
  //   str[0] = str[0].replace(/\B(?=(\d{2})+(?!\d))/g, ".");
  //   return str.join(".") 
  // }

  return (
    <>      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        transition={{ duration: 0.2, delay: 0.15 }}
        style={{ pointerEvents: "auto" }}
        className="overlay"
      >
      </motion.div>

      <div className="card-content-container open">
        <motion.div className="card-content" layoutId={`card-container-${data.id}`}>
          <Stack bg='white'>
            <motion.div className="card-image-container" layoutId={`card-image-container-${data.id}`}>
              <Flex
                bg={colors.primary} 
                bgImage="./pokeballBg.svg"
                bgPosition='left'
                bgRepeat='no-repeat'
                bgSize='contain'
                w="50%"
                h='70%'
                align='center'          
              >
                <img className="card-image" src={data.image} alt="ImagePokemon" />
              </Flex>
            </motion.div>

            <motion.div className="title-container" layoutId={`title-container-${data.id}`}>
              <HStack>
                <Text fontSize='3xl' fontWeight='bold' >
                  {data.name.charAt(0).toUpperCase() + 
                  (data.name).slice(1)}
                </Text>
                <Text>{formattedID(data.id)}</Text>
              </HStack>

              <HStack spacing='1'>
                <Text fontSize='sm' color='white' bg={colors.primary} fontWeight='normal' borderRadius='20' p='1' px='4'>
                  {(onType[0]).charAt(0).toUpperCase() + 
                  (onType[0]).slice(1)}
                </Text>
                {onType[1] === undefined ? null :
                  <Text fontSize='sm' color='white' fontWeight='normal' ml='1' bg={onType[1] === 'undefined' ? null : colors.primary} w='auto' borderRadius='20' p='1' px='4'>   
                    {(onType[1]).charAt(0).toUpperCase() + 
                    (onType[1]).slice(1)}         
                  </Text>            
                }
              </HStack>

              <Text fontSize='sm' fontWeight='bold' color='orange.500' mt='3'>Height</Text>
              <Text fontWeight='bold' fontSize='sm'>{data.height}m</Text>

              <Text fontSize='sm' fontWeight='bold' color='blue.500' mt='4'>Weight</Text>
              <Text fontWeight='bold' fontSize='sm'>{data.weight}kg</Text>

              <Text fontSize='sm' fontWeight='bold' color='green.500' mt='4'>Abilities</Text>
              <Text fontWeight='bold' fontSize='sm'>
                {(ability[0] + ', ').charAt(0).toUpperCase() + 
                (ability[0] + ', ').slice(1)}

                {(ability[1] + ' ').charAt(0).toUpperCase() + 
                (ability[1] + ' ').slice(1)}
              </Text>

              <Text fontSize='sm' fontWeight='bold' color='red.500' mt='4'>Weakness</Text>
              <Flex>
                <Text fontWeight='bold' fontSize='sm' borderWidth={1} borderColor='#2F3133' borderRadius='20' px='4' py='1' >
                  {(weakness[0] + ' ').charAt(0).toUpperCase() + 
                  (weakness[0] + ' ').slice(1)}
                </Text>
                
                {weakness[1] === undefined ? null :
                  <Text fontWeight='bold' fontSize='sm' borderWidth={1} borderColor='#2F3133' borderRadius='20' px='4' py='1' ml='1'>
                    {(weakness[1] + ' ').charAt(0).toUpperCase() + 
                    (weakness[1] + ' ').slice(1)}
                  </Text>
                }

                {weakness[2] === undefined ? null :
                  <Text fontWeight='bold' fontSize='sm' borderWidth={1} borderColor='#2F3133' borderRadius='20' px='4' py='1' ml='1'>
                    {(weakness[2] + ' ').charAt(0).toUpperCase() + 
                    (weakness[2] + ' ').slice(1)}
                  </Text>
                }
              </Flex>
              <Flex mt='1'>
                {weakness[3] === undefined ? null :
                  <Text fontWeight='bold' fontSize='sm' borderWidth={1} borderColor='#2F3133' borderRadius='20' px='4' py='1' ml='1'>
                    {(weakness[3] + ' ').charAt(0).toUpperCase() + 
                    (weakness[3] + ' ').slice(1)}
                  </Text>
                }

                {weakness[4] === undefined ? null :
                  <Text fontWeight='bold' fontSize='sm' borderWidth={1} borderColor='#2F3133' borderRadius='20' px='4' py='1' ml='1'>
                    {(weakness[4] + ' ').charAt(0).toUpperCase() + 
                    (weakness[4] + ' ').slice(1)}
                  </Text>
                }
              </Flex>

              <Flex mt='4'>
                <VStack align='flex-end' spacing='3'>
                  <Text fontSize='sm' fontWeight='bold' alignSelf='flex-end' color='purple'>Stats</Text>

                  <HStack borderBottomWidth={1} w='100%' justify='space-between'>
                    <Text fontSize='sm' pr='40'>{String(statName[0]).toUpperCase()}</Text>
                    <Text fontSize='sm'>{amountStat[0]}</Text>
                  </HStack>

                  <HStack borderBottomWidth={1} w='100%' justify='space-between'>
                    <Text fontSize='sm'>{String(statName[1]+'').charAt(0).toUpperCase()+(statName[1]+'').slice(1)}</Text>
                    <Text fontSize='sm'>{amountStat[1]}</Text>
                  </HStack>

                  <HStack borderBottomWidth={1} w='100%' justify='space-between'>
                    <Text fontSize='sm'>{String(statName[2]+'').charAt(0).toUpperCase()+(statName[2]+'').slice(1)}</Text>
                    <Text fontSize='sm'>{amountStat[2]}</Text>
                  </HStack>

                  <HStack borderBottomWidth={1} w='100%' justify='space-between'>
                    <Text fontSize='sm'>{String(statName[3]+'').charAt(0).toUpperCase()+(statName[3]+'').slice(1)}</Text>
                    <Text fontSize='sm'>{amountStat[3]}</Text>
                  </HStack>

                  <HStack borderBottomWidth={1} w='100%' justify='space-between'>
                    <Text fontSize='sm'>{String(statName[4]+'').charAt(0).toUpperCase()+(statName[4]+'').slice(1)}</Text>
                    <Text fontSize='sm'>{amountStat[4]}</Text>
                  </HStack>

                  <HStack borderBottomWidth={1} w='100%' justify='space-between'>
                    <Text fontSize='sm'>{String(statName[5]+'').charAt(0).toUpperCase()+(statName[5]+'').slice(1)}</Text>
                    <Text fontSize='sm'>{amountStat[5]}</Text>
                  </HStack>
                </VStack>
              </Flex>
            </motion.div>

            <motion.div className="content-container" animate>
            </motion.div>
          </Stack>
        </motion.div>
      </div>
    </>    
  )
}