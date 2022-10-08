import '@fontsource/open-sans/800.css'

import {
  Flex,
  Container,
  Image,
  Text,
  HStack,
  Spacer
} from "@chakra-ui/react";
import AuthButton from "../AuthButton";
import Link from "next/link";

const NavigationBar: React.FC = () => {
  return(
    <>
      <Container maxW={{xl: "6xl"}}>
        <Flex height={"80px"}>
          <Link href="/">
            <HStack spacing={"16px"} cursor={"pointer"} height={"80px"} minW={"32px"} alignItems={"center"}>
              <Image src="/logo.svg" width={"32px"} height={"40px"} />
              <Text fontFamily={"Open Sans"} fontSize={"3xl"} color={"red.500"}>
                Scout
              </Text>
            </HStack>
          </Link>
          <Spacer />
          <Flex height={"80px"} alignItems={"center"}>
            <AuthButton />
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default NavigationBar;