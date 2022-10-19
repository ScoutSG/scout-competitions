import { Button, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

const SignInButton = () => {
  const color = useColorModeValue("cyan.600", "cyan.400");

  return (
    <Link href="/auth/signin">
      <Button
        display={{ base: "none", lg: "flex" }}
        color={color}
        borderColor={color}
        variant="outline"
        size="md"
      >
        Find your team
      </Button>
    </Link>
  );
};

export default SignInButton;
