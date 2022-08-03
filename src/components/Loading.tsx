import React from 'react';
import { Flex } from "@chakra-ui/react";
import Lottie from 'lottie-react-web'
import loadingPokeball from '../../public/loadingPokeball.json'

export function Loading() {
  return (
    <Flex w='100' h='100'>
      <Lottie 
        options={{
          animationData: loadingPokeball
        }}
      />
    </Flex>
  )
}