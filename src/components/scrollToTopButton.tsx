import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [ pageYPosition, setPageYPosition ] = useState(0);

  useEffect(() => {
    function getPageYAfterScroll() {
      setPageYPosition(window.scrollY)
    }
    window.addEventListener('scroll', getPageYAfterScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      { pageYPosition > 1600 && 
        <Button
          type="button" 
          onClick={scrollToTop}
          position='fixed'
          bottom='32'
          right='5'
          bg='yellow.400'
          borderWidth={3}
          borderColor='blue.500'
          boxShadow='lg'
          transform='rotate(-3deg)'
          transition='transform 200ms ease'
          _hover={{transform: 'rotate(0deg) scale(1.04)'}}
        >
          <Text>Back to top</Text>
          <Image src="./pokebolaS.png" w='6' h='6' ml='2' />
        </Button>
      }
    </>
  )
}