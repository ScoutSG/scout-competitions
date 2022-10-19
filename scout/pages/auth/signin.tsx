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
import { TbBrandGoogle } from "react-icons/tb";
import { getCsrfToken } from "next-auth/react";
import { getProviders, signIn } from "next-auth/react";
import ScoutIcon from "../../core/Icons/ScoutIcon";

export default function SignInPage({ csrfToken, providers }) {
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
            <form method="post" action="/api/auth/signin/email">
              <Stack spacing={4}>
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <FormControl id="email">
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="yourname@example.com"
                  />
                </FormControl>
                <Button
                  type="submit"
                  bg={"cyan.500"}
                  color={"white"}
                  _hover={{
                    bg: "cyan.600",
                  }}
                >
                  Continue
                </Button>
              </Stack>
            </form>
            <HStack>
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                or
              </Text>
              <Divider />
            </HStack>
            <Button
              onClick={() => signIn(providers.google.id, { callbackUrl: "/" })}
              w={"full"}
              variant={"outline"}
              leftIcon={<TbBrandGoogle />}
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

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  return {
    props: { csrfToken, providers },
  };
}
