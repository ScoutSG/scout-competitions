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
          size={{ base: "2xl", md: "3xl" }}
          width="fit-content"
          bgGradient="linear(to-l, #4285f4, #34a853, #fbbc05, #ea4335)"
          bgClip="text"
        >
          Google-Backed
        </Heading>
        <Heading size={{ base: "2xl", md: "3xl" }}>Questions</Heading>
        <Stack pt={4}>
          <Text fontSize={{ base: "xl", md: "2xl" }}>
            📎 Get to know your prospective team members by asking them
            questions. Our templates are adapted from Google's research on what
            drives effective teams.
          </Text>
        </Stack>
      </Stack>
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
                "asking teammates for their usernames",
                "manually adding them to the group",
              ],
              autoStart: true,
              loop: true,
              delay: 20,
            }}
          />
        </Stack>
      </Stack>
    </Flex>
  );
};

export default TwoStat;
