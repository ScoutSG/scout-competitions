import {
  Flex,
  Stack,
  useColorModeValue,
  Text,
  Heading,
} from "@chakra-ui/react";
import TypeWriter from "typewriter-effect";

const TwoStat: React.FC = () => {
  const bgColor = useColorModeValue("gray.50", "gray.700");

  return (
    <Flex flexWrap="wrap" gap={16}>
      <Stack flex={1} p={8} bgColor={bgColor} rounded="xl" boxShadow="xl">
        <Heading
          size={{ base: "2xl", sm: "3xl" }}
          bgGradient="linear(to-l, #4e65ff, #92effd)"
          bgClip="text"
        >
          Instant
        </Heading>
        <Heading size={{ base: "2xl", md: "3xl" }}>Telegram Groups</Heading>

        <Stack pt={4} fontSize={{ base: "xl", md: "2xl" }}>
          <Text>👋 Say goodbye to </Text>
          <TypeWriter
            options={{
              strings: [
                "asking teammates for their contacts",
                "manually adding them",
              ],
              autoStart: true,
              loop: true,
              delay: 20,
            }}
          />
        </Stack>
      </Stack>

      <Stack flex={1} p={8} bgColor={bgColor} rounded="xl" boxShadow="xl">
        <Heading
          size={{ base: "2xl", md: "3xl" }}
          bgGradient="linear(to-l, #4285f4, #34a853, #fbbc05, #ea4335)"
          bgClip="text"
        >
          Google - Backed
        </Heading>
        <Heading size={{ base: "2xl", md: "3xl" }}>Questions</Heading>
        <Stack pt={4}>
          <Text fontSize={{ base: "xl", md: "2xl" }}>
            📎 Our template questions are adapted from Google's research on what
            drives effective teams.
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default TwoStat;
