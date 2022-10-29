import { Center, Heading, useColorModeValue, Text, Stack, Button, Box } from "@chakra-ui/react";
import Link from "next/link";
import ScoutIcon from "../../core/Icons/ScoutIcon";

export default function VerifyRequest() {
  return (
    <Center
      height="100vh"
      width="100vw"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
        <Stack alignItems="center" spacing={4}>
        <ScoutIcon width={240} height={128} />
        <Heading>
            Check your email
        </Heading>
        <Text>
            We have sent an email to you.
        </Text>
        <Link href="/">
        <Box pt={4}>
        <Button size="lg" colorScheme="teal">
            Go back to homepage
        </Button>
        </Box>
        </Link>
        </Stack>
    </Center>
  );
}
