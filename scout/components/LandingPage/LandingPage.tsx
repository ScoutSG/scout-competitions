import {
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
  Center,
  Divider,
  Button,
  Icon,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import { TbHandClick } from "react-icons/tb";
import TypeWriter from "typewriter-effect";
import { BETA_FEEDBACK_LINK } from "../../core/constants";
import SkeletonCompetition from "./SkeletonCompetition";
import SkeletonGroup from "./SkeletonGroup";
import SkeletonQuestions from "./SkeletonQuestions";
import TwoStat from "./TwoStat";

const LandingPage: React.FC = () => {
  return (
    <>
      <Stack pb={16}>
        <Flex flexWrap="wrap" justifyContent="right">
          <Stack
            pt={{ base: 16, lg: 24 }}
            pl={{ base: 0, sm: 8, md: 16 }}
            pr={16}
          >
            <Heading size={{ base: "3xl", sm: "4xl" }}>Success starts</Heading>
            <Heading size={{ base: "3xl", sm: "4xl" }}>with a</Heading>
            <Heading
              size={{ base: "3xl", sm: "4xl" }}
              bgGradient="linear(to-r, #8B008B, #FF6347)"
              bgClip="text"
            >
              dream team
            </Heading>
            <Stack pt={4} fontSize={{ base: "xl", sm: "3xl" }}>
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
            <Stack pt={4}>
              <Link href="/competitions">
                <Button
                  fontSize="xl"
                  color="white"
                  height="48px"
                  width="160px"
                  bgGradient="linear(to-r, #8B008B, #FF6347)"
                  _hover={{ bgGradient: "linear(to-r, #8B008B, #FF6347)" }}
                  role="group"
                >
                  <Box
                    height="48px"
                    width="160px"
                    position="absolute"
                    bgColor="whiteAlpha.400"
                    rounded="md"
                    visibility="hidden"
                    _groupHover={{ visibility: "visible" }}
                  />
                  Start now
                </Button>
              </Link>
            </Stack>
          </Stack>
          <Spacer />
          <SkeletonGroup />
        </Flex>
        <Flex flexWrap="wrap-reverse" justifyContent="right" pt={16}>
          <SkeletonCompetition />
          <Spacer />
          <Stack pt={16} pr={{ base: 0, sm: 8, md: 16 }} pl={16}>
            <Heading textAlign="right" size={{ base: "3xl", sm: "4xl" }}>
              Discover the
            </Heading>
            <Heading
              textAlign="right"
              size={{ base: "3xl", sm: "4xl" }}
              bgGradient="linear(to-l, #0052D4, #43C6AC)"
              bgClip="text"
            >
              best events
            </Heading>
            <Heading textAlign="right" size={{ base: "3xl", sm: "4xl" }}>
              to try
            </Heading>
            <Stack pt={4} fontSize={{ base: "xl", sm: "3xl" }}>
              <Text textAlign="right">We keep you up-to-date on the</Text>
              <Text textAlign="right">latest competitions so you will</Text>
              <Text textAlign="right">never miss an opportunity</Text>
            </Stack>
          </Stack>
        </Flex>
        <Flex flexWrap="wrap" justifyContent="right" pt={16}>
          <Stack pt={16} pl={{ base: 0, sm: 8, md: 16 }} pr={16}>
            <Heading size={{ base: "3xl", sm: "4xl" }}>Get to</Heading>
            <Heading size={{ base: "3xl", sm: "4xl" }}>know your</Heading>
            <Heading size={{ base: "3xl", sm: "4xl" }}>teammates</Heading>
            <Stack pt={4} fontSize={{ base: "xl", sm: "3xl" }}>
              <Text>Ask your potential teammates</Text>
              <Text>questions to build an</Text>
              <Text>effective team</Text>
            </Stack>
          </Stack>
          <Spacer />
          <SkeletonQuestions />
        </Flex>
        <Divider py={16} />

        <Center py={16}>
          <Stack justify="center" spacing={4}>
            <Heading
              size={{ base: "3xl", md: "4xl" }}
              textAlign="center"
              textColor={useColorModeValue("green.500", "green.300")}
            >
              <Icon
                as={TbHandClick}
                mr={4}
                color={useColorModeValue("green.500", "green.300")}
              />
              One-click
            </Heading>
            <Heading size={{ base: "3xl", md: "4xl" }} textAlign="center">
              Group Set Up
            </Heading>
          </Stack>
        </Center>
        <TwoStat />
      </Stack>
      <Divider />
      <Stack pt={16} pb={8} spacing={4}>
        <Center>
          <Heading size={{ base: "xl", md: "2xl" }}>We are in beta.</Heading>
        </Center>

        <Button
          as="a"
          href={BETA_FEEDBACK_LINK}
          target="_blank"
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
