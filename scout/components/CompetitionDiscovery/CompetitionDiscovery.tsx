import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import Head from "next/head";
import { CompetitionDataSummary } from "../../core/types/CompetitionDetail";
import Footer from "../Footer";
import NavigationBar from "../NavigationBar";
import CompetitionSummaryView from "./CompetitionSummaryView";

const CompetitionDiscovery: React.FC = ({
  competitions,
}: {
  competitions: CompetitionDataSummary[];
}) => {
  return (
    <>
      <Container
        position="relative"
        minH="100vh"
        width="100vw"
        maxWidth="100%"
        padding="0px"
        margin="0px"
        alignItems="center"
      >
        <NavigationBar />
        <Head>
          <title>Competitions - Scout</title>
        </Head>
        <Flex
          width="100%"
          justifyContent="center"
          pt="80px"
          px="4vw"
          minHeight="400px"
          bgColor="primary.900"
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
              <Text color="white" fontSize={{ base: "lg", md: "xl" }}>
                From hackathons to case competitions, there's something for
                everyone.
              </Text>
            </Stack>
            <Box>
              <Image
                src="/discoveryBanner.svg"
                alt="banner"
                minWidth="320px"
                width="320px"
                height="320px"
                display={{ base: "none", lg: "block" }}
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
      </Container>
    </>
  );
};

export default CompetitionDiscovery;
