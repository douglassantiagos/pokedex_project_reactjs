import { HStack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface StatsProps {
  statName: ReactNode;
  amountStat: ReactNode;
}

export function Stats({statName, amountStat}: StatsProps) {
  return (
    <HStack borderBottomWidth={1} w='100%' justify='space-between'>
      <Text fontSize='sm' pr='16'>{statName}</Text>
      <Text fontSize='sm'>{amountStat}</Text>
    </HStack>
  )
}