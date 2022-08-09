import { useEffect, useState } from 'react';
import { Flex, Stack, Text, HStack, VStack, Image, useBreakpointValue } from '@chakra-ui/react';
import { motion } from "framer-motion"
import { formattedID } from '../../utils/formattedID';
import { getTypeData } from '../../services';
import { Stats } from './Stats'
import { Weakness } from './Weakness';
import { GetStaticProps } from 'next';

export default function Modal({ data, onType, colors }) { 
  const [ability, setAbility] = useState([])
  const [weakness, setWeakness] = useState([])
  const [statName, setStatName] = useState([])
  const [amountStat, setAmountStat] = useState([])

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
  }
  
  useEffect(() => { 
    getAbilitiesNameData();
    getWeaknessesData();
    getStatsData()
  }, [])

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
          <Stack flexWrap='wrap' bg='white'>
            <motion.div className="card-image-container" layoutId={`card-image-container-${data.id}`}>
              <Flex
                flexWrap='wrap'
                bg={colors.primary} 
                bgImage="./pokeballBg.svg"
                bgPosition='left'
                bgRepeat='no-repeat'
                bgSize='contain'
                maxW={["35%", "60%"]}
                h={'90%'}
                align='center'      
              >
                <Image className="card-image" src={data.image} alt="ImagePokemon" />
              </Flex>
            </motion.div>

            <motion.div className="title-container" layoutId={`title-container-${data.id}`}>
              <HStack>
                <Text fontSize='3xl' fontWeight='bold' >
                  {data.name.charAt(0).toUpperCase() + (data.name).slice(1)}
                </Text>
                <Text>{formattedID(data.id)}</Text>
              </HStack>

              <HStack spacing='1' mt='2'>
                <Text fontSize='sm' color='white' bg={colors.primary} fontWeight='normal' borderRadius='20' p='1' px='4'>
                  {(onType[0]).charAt(0).toUpperCase() + (onType[0]).slice(1)}
                </Text>
                {onType[1] === undefined ? null :
                  <Text fontSize='sm' color='white' fontWeight='normal' ml='1' bg={onType[1] === 'undefined' ? null : colors.secondary} w='auto' borderRadius='20' p='1' px='4'>   
                    {(onType[1]).charAt(0).toUpperCase() + (onType[1]).slice(1)}         
                  </Text>            
                }
              </HStack>

              <Text fontSize='sm' fontWeight='bold' color='orange.500' mt='4'>Height</Text>
              <Text fontWeight='bold' fontSize='sm'>{data.height}m</Text>

              <Text fontSize='sm' fontWeight='bold' color='blue.500' mt='4'>Weight</Text>
              <Text fontWeight='bold' fontSize='sm'>{data.weight}kg</Text>

              <Text fontSize='sm' fontWeight='bold' color='green.500' mt='4'>Abilities</Text>
              <Text fontWeight='bold' fontSize='sm'>
                {(ability[0] + ', ').charAt(0).toUpperCase() + (ability[0] + ', ').slice(1)}
                {(ability[1] + ' ').charAt(0).toUpperCase() + (ability[1] + ' ').slice(1)}
              </Text>

              <Text fontSize='sm' fontWeight='bold' color='red.500' mt='4'>Weakness</Text>
              <Flex>
                <Weakness weakness={weakness[0]} />
                { weakness[1] === undefined ? null : <Weakness weakness={weakness[1]} /> }
                { weakness[2] === undefined ? null : <Weakness weakness={weakness[2]} /> }
              </Flex>
              <Flex mt='1'>
                { weakness[3] === undefined ? null : <Weakness weakness={weakness[3]} /> }
                { weakness[4] === undefined ? null : <Weakness weakness={weakness[4]} /> }
              </Flex>

              <VStack align='flex-end' spacing='3' mt='4'>
                <Text fontSize='sm' fontWeight='bold' color='purple'>Stats</Text>
                <Stats statName={String(statName[0]).toUpperCase()} amountStat={amountStat[0]} />
                <Stats statName={String(statName[1]+'').charAt(0).toUpperCase()+(statName[1]+'').slice(1)} amountStat={amountStat[1]} />
                <Stats statName={String(statName[2]+'').charAt(0).toUpperCase()+(statName[2]+'').slice(1)} amountStat={amountStat[2]} />
                <Stats statName={String(statName[3]+'').charAt(0).toUpperCase()+(statName[3]+'').slice(1)} amountStat={amountStat[3]} />
                <Stats statName={String(statName[4]+'').charAt(0).toUpperCase()+(statName[4]+'').slice(1)} amountStat={amountStat[4]} />
                <Stats statName={String(statName[5]+'').charAt(0).toUpperCase()+(statName[5]+'').slice(1)} amountStat={amountStat[5]} />
              </VStack>
            </motion.div>

            <motion.div className="content-container" animate>
            </motion.div>
          </Stack>
        </motion.div>
      </div>
    </>    
  )
}