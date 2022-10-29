import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Divider,
  HStack,
  Center,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import ScoutIcon from "../../core/Icons/ScoutIcon";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Flex
      height="100vh"
      width="100vw"
      align={"center"}
      justify={"center"}
      direction={"column"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={4} align={"center"} width="75%">
        <ScoutIcon width={240} height={128} />
        <Heading fontSize={"5xl"} textAlign={"center"}>
          Enter your email
        </Heading>
        <Text fontSize={"lg"} textAlign={"center"}>
          We will send you a magic link to login. No password required.
        </Text>
      </Stack>
      <Stack py={8} px={{ base: "16px", md: "0px" }} width="100%" maxW="lg">
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          pb={8}
          pt={4}
          px={8}
        >
          <Stack spacing={4}>
            <Stack spacing={4}>
              <FormControl>
                <Input
                  placeholder="yourname@example.com"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>
              <Button
                isLoading={isLoading}
                onClick={() => {
                  setIsLoading(true);
                  signIn("email", {
                    email: email,
                    callbackUrl: "/competitions",
                  });
                }}
                colorScheme="teal"
              >
                Continue
              </Button>
            </Stack>
            <HStack>
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                or
              </Text>
              <Divider />
            </HStack>
            <Button
              onClick={() => signIn("google", { callbackUrl: "/competitions" })}
              w={"full"}
              variant={"outline"}
              leftIcon={<FcGoogle />}
            >
              <Center>
                <Text>Sign In with Google</Text>
              </Center>
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
