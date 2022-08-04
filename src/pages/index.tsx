import React, { useCallback, useEffect, useState } from "react";
import { Grid, Flex, Text, Image, Button, Stack} from "@chakra-ui/react";

import { Header } from "../components/Header";
import { SearchInput } from "../components/SearchInput";
import { Loading } from "../components/Loading";
import { Sidebar } from "../components/Sidebar";
import { PokemonCard } from "../components/PokemonCard";
import { Footer } from "../components/Footer";
import { getAllPokemons, getAllTypeData, getPokemon, getTypeData } from "../services";
import Head from "next/head";
import { ScrollToTopButton } from "../components/scrollToTopButton";

export default function Home() {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoadingNextCard, setIsLoadingNextCard] = useState(false);
  const [amountCardsOnPage, setAmountCardsOnPage] = useState(9);
  
  const [pokemonsToShow, setPokemonsToShow] = useState([])
  const [pokemonsTypeSelectedData, setPokemonsTypeSelectedData] = useState([])
  const [listTypeNames, setListTypeNames] = useState([]); 
  const [typeSelected, setTypeSelected] = useState("All");
  const limitCardsOnPage = 9;

  function handleChange(props) {
    setPokemon(props.target.value.toLowerCase());
  }
  
  function handleSubmit(props) {
    setIsLoadingData(true)
    
    props.preventDefault();
    selectPokemon(pokemon);
    
    setIsLoadingData(false)
  }

  async function selectPokemon(pokemon) {
    const toArray = [];

    const apiPokemonData = await getPokemon(pokemon)

    toArray.push(apiPokemonData)
    
    const getPokemonSelected = toArray.map((pokemon) => {
      return {
        key: pokemon.id,
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other['official-artwork'].front_default,
        types: pokemon.types,        
        height: pokemon.height,
        weight: pokemon.weight,
        abilities: pokemon.abilities,
        stats: pokemon.stats
      }
    })

    setPokemonsToShow(getPokemonSelected);
  }
  
  useEffect(() => {
    async function fetchPokemonData() {
      
      if (typeSelected !== 'All') return;
      
      const apiMainData = await getAllPokemons(limitCardsOnPage, amountCardsOnPage - 9);

      setIsLoadingNextCard(true)

      // recebo todos os dados de todos os pokemons
      const promisesAllPokemonsData = apiMainData.results.map(
        (pokemon) => getPokemon(pokemon.name)
      );

      const allPokemonsData = await Promise.all(promisesAllPokemonsData);

      const listAllPokemonsData = allPokemonsData.map((pokemon) => {
        return {
          key: pokemon.id,
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other['official-artwork'].front_default,
          types: pokemon.types,
          height: pokemon.height,
          weight: pokemon.weight,
          abilities: pokemon.abilities,
          stats: pokemon.stats
        }        
      })

      setPokemonData([...pokemonData, ...listAllPokemonsData]);
      setIsLoadingData(false); //mudo setIsLoadingData() para falso, pois os dados já foram carregados
      setIsLoadingNextCard(false); 
    }

    fetchPokemonData();
  }, [amountCardsOnPage, typeSelected]);

  useEffect(() => {
    async function fetchTypesData() {
      setIsLoadingData(true)

      const apiTypesList = await getAllTypeData(); // recebo todos os dados do endpoint 'type'
      const listAllTypeName = await apiTypesList.results.map((type) => type.name);

      const listTypeNames = await listAllTypeName.filter(
        (name) => name !== "unknown" && name !== "shadow"
      );

      setListTypeNames(listTypeNames); // nome de todos os tipos de pokemons

      //teste
      if (typeSelected === "All") return;

      const promisesEachTypeData = apiTypesList.results.map((type) => getTypeData(type.url)) // recebendo a url de cada tipo
      const eachTypeData = await Promise.all(promisesEachTypeData); // espera todas as promises de "promisesEachTypeData" e recebe

      // recebendo o nome do tipo do pokemon e comparando com tipo que foi selecionado
      const typeSelectedData = eachTypeData.filter((type) => 
        type.name === typeSelected
      ); 

      // recebendo os nomes dos pokemons do tipo selecionado
      const typeSelectedPokemonsNames = typeSelectedData.map((data) => 
        data.pokemon.map((item) => item.pokemon.name)
      );     
      
      // rececendo o endpoint "https://pokeapi.co/api/v2/pokemon/${pokemon}" com o nome do pokemon
      const promisesPokemonsTypeSelected = typeSelectedPokemonsNames.map((item) => 
        item.map((name) => getPokemon(name))
      );

      // espera todas as promises de "promisesPokemonsTypeSelected" e recebe
      const pokemonsTypeSelected = await Promise.all(
        promisesPokemonsTypeSelected[0]
      ); 
      
      setPokemonsTypeSelectedData(pokemonsTypeSelected.map((pokemon) => {
        return {
          key: pokemon.id,
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other['official-artwork'].front_default,
          types: pokemon.types,
          height: pokemon.height,
          weight: pokemon.weight,
          abilities: pokemon.abilities,
          stats: pokemon.stats
        }
      }));

      setIsLoadingData(false)
    }
    
    fetchTypesData();
  }, [typeSelected])

  useEffect(() => {
    typeSelected === "All" ? setPokemonsToShow(pokemonData) : setPokemonsToShow(pokemonsTypeSelectedData);

  }, [
    pokemonData,
    typeSelected,
    pokemonsTypeSelectedData,
  ])

  useEffect(() => {
    pokemonsToShow.length > 0 ? setIsLoadingData(false) : setIsLoadingData(true);
  }, [])

  useEffect(() => {
    setAmountCardsOnPage(9);
    setPokemonData([]);
  }, [typeSelected]);

  const handleClickCallback = useCallback((name: string) => {
    setTypeSelected(name);
  }, [])

  const handleShowMoreCards = () => {
    setAmountCardsOnPage(amountCardsOnPage + 9)
  }  
   
  return (
    <>    
      <Head>
        <title>Pokedex</title>
      </Head>

      <Flex direction='column' w='100%' h='100vh'>
        <Header />

        <SearchInput 
          onHandleSubmit={handleSubmit} 
          onHandleChange={handleChange} 
        />
        
        <Flex 
          mb='10' 
          mt='8' 
          mx="auto" 
          p="4" 
          w='100%'
          maxW={[900, 900, 900, 900, 1230]}
          direction={['column', 'column', 'column', 'row']} 
          align={['center', 'center', 'center', 'start']} 
          justify={['center', 'center', 'center', 'space-between']}
        >
          <Sidebar
            handleClickCallback={handleClickCallback}
            onListTypeNames={listTypeNames}
            selected={typeSelected}
          />

          { isLoadingData ? 
          <Flex
            justify='center' 
            align='center' 
            mx="auto" 
            h='80vh' 
            w='100%' 
            maxW={1230} 
            bgImage="./pokeballBg.svg" 
            bgRepeat='no-repeat' 
            bgPosition='center'
            bgSize='cover'
          >
            <Loading />
          </Flex> :


          <Flex  direction='column' maxW={[,'77%']} >
            <Flex mb='8'>
              <Image src='../pokebolaA.png' w='6' h='6' mr='4' />                
              <Text mr='1' fontWeight='bold'>
                {typeSelected === 'All' ? '1154' : pokemonsToShow.length} Pokémons
              </Text>
            </Flex>

            <Grid gap={[4, 4, 4, 7]} alignItems='flex-start' templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}>
              { pokemonsToShow.map(item => {
                return (
                  <PokemonCard               
                    key={item.id}
                    onPokemonData={item}
                  />                           
                )
              })}
            </Grid>

            { amountCardsOnPage <= pokemonData.length && 
              // isLoadingNextCard ? 
              // <Flex alignSelf='center' w='10' h='10'>
              //   <Loading />
              // </Flex> :
              <Flex mb='8' justify='center'>
                <Button
                  mt='10'
                  py='2'
                  px='10'
                  bg='yellow.400'
                  borderWidth={3}
                  borderColor='blue.500'
                  boxShadow='lg'
                  transform='rotate(-3deg)'
                  transition='transform 200ms ease'
                  _hover={{transform: 'rotate(0deg) scale(1.05)'}}

                  onClick={handleShowMoreCards}
                >
                  Carregar mais
                </Button>
              </Flex>
            }

            <ScrollToTopButton />
          </Flex>              
          }           
        </Flex>

        <Footer />
      </Flex>
    </>
  )
}
