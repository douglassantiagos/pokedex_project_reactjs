import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface WeaknessProps {
  weakness: ReactNode;
}

export function Weakness({weakness}: WeaknessProps) {
  return (
    <Text fontWeight='bold' fontSize='sm' borderWidth={1} borderColor='#2F3133' borderRadius='20' px='4' py='1' ml='1'>
      {(weakness + ' ').charAt(0).toUpperCase() + (weakness + ' ').slice(1)}
    </Text>
  )
}