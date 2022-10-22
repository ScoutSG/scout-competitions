import { Button, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

const SignInButton = () => {
  return (
    <Link href="/auth/signin">
      <Button
        display={{ base: "none", lg: "flex" }}
        colorScheme="teal"
        variant="outline"
        size="md"
      >
        Find your team
      </Button>
    </Link>
  );
};

export default SignInButton;
