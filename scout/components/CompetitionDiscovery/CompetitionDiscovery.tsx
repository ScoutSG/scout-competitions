import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  Image,
  useColorModeValue,
  Center,
  Divider,
} from "@chakra-ui/react";
import Head from "next/head";
import { CompetitionDataSummary } from "../../core/types/CompetitionDetail";
import Footer from "../Footer";
import NavigationBar from "../NavigationBar";
import CompetitionSummaryView from "./CompetitionSummaryView";
import useAnalyticsTracker from "../../lib/hooks/useAnalyticsTracker";

const CompetitionDiscovery: React.FC = ({
  competitions,
}: {
  competitions: CompetitionDataSummary[];
}) => {
  const eventAnalyticsTracker = useAnalyticsTracker("Competition Discovery");
  return (
    <>
      <Stack position="relative" minH="100vh" padding="0px" margin="0px">
        <NavigationBar />
        <Head>
          <title>Competitions - Scout</title>
        </Head>
        <Flex
          width="100%"
          justifyContent="center"
          pt="80px"
          px="4vw"
          minHeight="320px"
          bgColor={useColorModeValue("primary.900", "primary.900")}
        >
          <HStack spacing={16}>
            <Stack spacing={4} as={"header"}>
              <Heading
                color="white"
                fontSize={{ base: "4xl", md: "6xl" }}
                fontWeight="black"
              >
                Discover Competitions
              </Heading>
              <Text color="white" fontSize="xl">
                From hackathons to case competitions, there's something for
                everyone.
              </Text>
            </Stack>
            <Box>
              <Image
                src="/banner-discovery.svg"
                alt="banner"
                width="320px"
                height="320px"
                display={{ base: "none", md: "block" }}
              />
            </Box>
          </HStack>
        </Flex>
        <Container
          maxW={{ xl: "8xl" }}
          px="4vw"
          pb={{ base: "104px", md: "64px" }}
        >
          <CompetitionSummaryView competitions={competitions} />
        </Container>
        <Footer />
      </Stack>
    </>
  );
};

export default CompetitionDiscovery;
