import { Flex, Image, Link } from "@chakra-ui/react";

export function Header() {
  return (
    <Flex bgGradient='linear(to-b, #C20001, #B50001)' p='5' justify='center'>
      <Link href='/'>
        <Image src="../logo.svg"/>      
      </Link>
    </Flex>
  )
}