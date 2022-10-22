import NextLink from "next/link";
import { Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const AuthButton: React.FC = () => {
    const color = useColorModeValue('red.500', 'red.400')
    return(
        <NextLink href="/auth/signin" passHref>
            <Button color={color} borderColor={color} variant="outline" size="md">
                Find your team
            </Button>
        </NextLink>
    );
};

export default AuthButton;
