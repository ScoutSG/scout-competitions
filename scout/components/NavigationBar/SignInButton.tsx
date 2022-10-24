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
        Sign In
      </Button>
    </Link>
  );
};

export default SignInButton;
