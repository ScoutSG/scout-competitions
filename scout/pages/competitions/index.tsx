import React from "react";
import Head from "next/head";
import {
  Heading,
  Box,
  Stack,
  SimpleGrid,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { CompetitionDataSummary } from "../../core/types/CompetitionDetail";
import CompetitionSummaryCard from "../../components/Competition/Summary";
import { AxiosResponse } from "axios";
import clientApi from "../../core/api/client";

export async function getStaticProps() {
  let response: AxiosResponse<any, any>;
  try {
    response = await clientApi.get("/competitions");
  } catch (err) {
    return { notFound: true };
  }
  const competitions = response.data;

  return {
    props: {
      competitions,
    },
    revalidate: 60,
  };
}

const CompetitionDiscovery: React.FC = ({
  competitions,
}: {
  competitions: CompetitionDataSummary[];
}) => {
  return (
    <>
      <Head>
        <title>Competitions - Scout</title>
      </Head>
      <Stack
        spacing={10}
        py={4}
        align="center"
        justify="center"
        bgColor="primary.500"
        h={{ base: "300px", md: "300px" }}
        px={{ base: 4, md: 10 }}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={20}
          align="center"
        >
          <Box as={"header"} p={1}>
            <Heading
              textTransform="uppercase"
              color="white"
              fontSize={{ base: "3xl", md: "6xl" }}
              fontWeight="black"
              mb={5}
            >
              Discover Competitions
            </Heading>
            <Text color="white" fontWeight="semibold">
              From hackathons to design, there's something for you.
            </Text>
          </Box>
          <Box>
            <Image
              src="/banner-discovery.svg"
              alt="banner"
              w={"full"}
              width={{ base: "0px", sm: "0px", md: "300px" }}
              height={{ base: "0px", sm: "0px", md: "300px" }}
            />
          </Box>
        </Stack>
      </Stack>
      <Stack px={{ base: 4, md: 10 }}>
        <CompetitionSummaryView competitions={competitions} />
      </Stack>
    </>
  );
};

const CompetitionSummaryView: React.FC<{
  competitions: CompetitionDataSummary[];
}> = ({ competitions }) => {
  return (
    <Box p={{ base: 3, md: 6 }} w={"100%"}>
      {competitions.length === 0 ? (
        <Stack spacing={4}>
          <Text>Oops! There is no competition ongoing now.</Text>
          <Heading size="md">Know of One?</Heading>
          <Button rightIcon={<ChevronRightIcon />}>
            Submit the competition details here
          </Button>
        </Stack>
      ) : (
        <Stack align="center" spacing={1} justify="center">
          <Text fontWeight="black" mb={4}>
            {competitions.length} Results Found
          </Text>
          {competitions.map((competition) => (
            <CompetitionSummaryCard competition={competition} />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default CompetitionDiscovery;
