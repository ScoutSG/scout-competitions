import { Flex, Heading, Spacer, Stack, Text, Wrap } from "@chakra-ui/react";
import TypeWriter from "typewriter-effect";
import SkeletonCompetition from "./SkeletonCompetition";
import SkeletonGroup from "./SkeletonGroup";

const LandingPage: React.FC = () => {
  return (
    <Stack pb={16}>
      <Flex flexWrap="wrap" justifyContent="right">
        <Stack pt={32} pl={{ base: 0, md: 16 }}>
          <Heading size={{ base: "3xl", md: "4xl" }}>
            Success starts
          </Heading>
          <Heading size={{ base: "3xl", md: "4xl" }}>with a</Heading>
          <Heading
            size={{ base: "3xl", md: "4xl" }}
            bgGradient="linear(to-r, #8B008B, #FF6347)"
            bgClip="text"
          >
            dream team
          </Heading>
          <Stack pt={4} fontSize={{ base: "2xl", md: "3xl" }}>
            <Text>Scout for the ideal team to</Text>
            <TypeWriter
              options={{
                strings: [
                  "win competitions together",
                  "build your network",
                  "pick up new skills",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
              }}
            />
          </Stack>
        </Stack>
        <Spacer />
        <SkeletonGroup />
      </Flex>
      <Flex
        flexWrap="wrap-reverse"
        flexDirection="revert"
        justifyContent="right"
        pt={16}
      >
        <SkeletonCompetition />
        <Spacer />
        <Stack pt={16} pr={{ base: 0, md: 16 }}>
          <Heading
            textAlign="right"
            size={{ base: "3xl", md: "4xl" }}
          >
            Discover the
          </Heading>
          <Heading
            textAlign="right"
            size={{ base: "3xl", md: "4xl" }}
            bgGradient="linear(to-l, #0052D4, #43C6AC)"
            bgClip="text"
          >
            best competitions
          </Heading>
          <Heading
            textAlign="right"
            size={{ base: "3xl", md: "4xl" }}
          >
            to participate in
          </Heading>
          <Stack pt={4}>
            <Text textAlign="right" fontSize={{ base: "2xl", md: "3xl" }}>
              We update you on the latest
            </Text>
            <Text textAlign="right" fontSize={{ base: "2xl", md: "3xl" }}>
              competitions so you will never
            </Text>
            <Text textAlign="right" fontSize={{ base: "2xl", md: "3xl" }}>
              miss an opportunity
            </Text>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default LandingPage;
