import { Button, Flex, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

const MobileSignInButton = () => {
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Link href="/auth/signin">
      <Flex
        width={"100%"}
        px={"4vw"}
        pt={"16px"}
        display={{ lg: "none" }}
        pb="40px"
        bgColor={bgColor}
      >
        <Button
          width={"100%"}
          colorScheme="teal"
          variant="outline"
          size="md"
        >
          Find your team
        </Button>
      </Flex>
    </Link>
  );
};

export default MobileSignInButton;
