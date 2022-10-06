import NextLink from "next/link";
import { Button } from "@chakra-ui/react";
import React from "react";

const AuthButton: React.FC = () => {
  return (
    <NextLink href="/auth/signin" passHref>
      <Button
        size="md"
        color="white"
        bg={"secondary"}
        _hover={{ color: "secondary", bg: "gray.50" }}
      >
        Get Started
      </Button>
    </NextLink>
  );
};

export default AuthButton;
