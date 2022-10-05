import NextLink from "next/link";
import { Button } from "@chakra-ui/react";

const AuthButton: React.FC = () => {
    return(
        <NextLink href="/auth/signin" passHref>
            <Button colorScheme="teal" variant="solid" size="md">
                Get Started
            </Button>
        </NextLink>
    );
};

export default AuthButton;