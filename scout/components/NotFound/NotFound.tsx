import { Heading, Stack, Text, Button } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Not Found</title>
      </Head>
      <Stack
        spacing={10}
        py={4}
        // direction={{ base: "row", md: "row" }}
        align="center"
        justify="center"
        h="100%"
        w="100%"
      >
        <Stack spacing={4} align="center" justify="center">
          <Heading m={1} p={1}>
            404: Page Not Found
          </Heading>
          <Text fontSize="xl" fontWeight="600">
            We could not find the page!
          </Text>
        </Stack>

        <NextLink href="/home">
          <Button rightIcon={<ChevronRightIcon />}>
            Don't worry, we'll still find you a team!
          </Button>
        </NextLink>
      </Stack>
    </>
  );
};

export default NotFound;
