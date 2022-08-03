import { Flex, Image } from "@chakra-ui/react";
import Link from "next/link";

export function Header() {
  return (
    <Flex bgGradient='linear(to-b, #C20001, #B50001)' p='5' justify='center'>
      <a href='/'>
        <Image src="../logo.svg"/>      
      </a>
    </Flex>
  )
}