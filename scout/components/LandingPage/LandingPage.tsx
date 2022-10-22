import {
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
  Center,
  Divider,
  Button,
} from "@chakra-ui/react";
import TypeWriter from "typewriter-effect";
import SkeletonCompetition from "./SkeletonCompetition";
import SkeletonGroup from "./SkeletonGroup";
import TwoStat from "./TwoStat";

const LandingPage: React.FC = () => {
  const betaFeedbackLink = () => {
    window.open("https://forms.gle/sHALP5znkgQnyQ3U8", "_blank");
  };

  return (
    <>
      <Stack pb={16}>
        <Flex flexWrap="wrap" justifyContent="right">
          <Stack pt={{ base: 16, md: 32 }} pl={{ base: 0, md: 16 }}>
            <Heading size={{ base: "3xl", md: "4xl" }}>Success starts</Heading>
            <Heading size={{ base: "3xl", md: "4xl" }}>with a</Heading>
            <Heading
              size={{ base: "3xl", sm: "4xl" }}
              bgGradient="linear(to-r, #8B008B, #FF6347)"
              bgClip="text"
            >
              dream team
            </Heading>
            <Stack pt={4} fontSize={{ base: "2xl", sm: "3xl" }}>
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
                  delay: 30,
                }}
              />
            </Stack>
          </Stack>
          <Spacer />
          <SkeletonGroup />
        </Flex>
        <Flex flexWrap="wrap-reverse" justifyContent="right" pt={16}>
          <SkeletonCompetition />
          <Spacer />
          <Stack pt={16} pr={{ base: 0, md: 16 }}>
            <Heading textAlign="right" size={{ base: "3xl", md: "4xl" }}>
              Discover the
            </Heading>
            <Heading
              textAlign="right"
              size={{ base: "3xl", md: "4xl" }}
              bgGradient="linear(to-l, #0052D4, #43C6AC)"
              bgClip="text"
            >
              best events
            </Heading>
            <Heading textAlign="right" size={{ base: "3xl", md: "4xl" }}>
              to try
            </Heading>
            <Stack pt={4}>
              <Text textAlign="right" fontSize={{ base: "2xl", md: "3xl" }}>
                We keep you up-to-date on the
              </Text>
              <Text textAlign="right" fontSize={{ base: "2xl", md: "3xl" }}>
                latest competitions so you will
              </Text>
              <Text textAlign="right" fontSize={{ base: "2xl", md: "3xl" }}>
                never miss an opportunity
              </Text>
            </Stack>
          </Stack>
        </Flex>
        <Divider py={16} />

        <Center py={16}>
          <Stack>
            <Heading size={{ base: "3xl", md: "4xl" }} textAlign="center">
              Finding and Forming is simple
            </Heading>
            <Heading size={{ base: "3xl", md: "4xl" }} textAlign="center">
              with Scout
            </Heading>
          </Stack>
        </Center>
        <TwoStat />
      </Stack>
      <Divider />
      <Stack py={16} spacing={4}>
        <Center>
          <Heading size={{ base: "xl", md: "2xl" }}>
            We are in private beta.
          </Heading>
        </Center>

        <Button
          onClick={betaFeedbackLink}
          variant="link"
          fontSize={{ base: "xl", md: "2xl" }}
          colorScheme="green"
        >
          Give us feedback!
        </Button>
      </Stack>
    </>
  );
};

export default LandingPage;
