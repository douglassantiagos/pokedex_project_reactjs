import { Button, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [ pageYPosition, setPageYPosition ] = useState(0);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

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

  if(!isWideVersion) {
    return (
      <>
      { pageYPosition > 1600 && 
        <Button
          display='flex'
          alignSelf='center'
          top='10'
          type="button" 
          onClick={scrollToTop}
          position='fixed'
          bg='blue.500'
          borderWidth={3}
          borderColor='yellow.400'
          boxShadow='lg'
          transform='rotate(-3deg)'
          transition='transform 200ms ease'
          _hover={{transform: 'rotate(0deg) scale(1.04)'}}
        >
          <Text color='white'>Back to top</Text>
          <Image src="./pokebolaS.png" alt='pokeball' w='6' h='6' ml='2' />
        </Button>
      }
    </>
    )
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
          bg='blue.500'
          borderWidth={3}
          borderColor='yellow.400'
          boxShadow='lg'
          transform='rotate(-3deg)'
          transition='transform 200ms ease'
          _hover={{transform: 'rotate(0deg) scale(1.04)'}}
        >
          <Text color='white'>Back to top</Text>
          <Image src="./pokebolaS.png" alt='pokeball' w='6' h='6' ml='2' />
        </Button>
      }
    </>
  )
}