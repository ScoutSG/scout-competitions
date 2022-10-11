import React from "react";
import Head from "next/head";
import {
  Heading,
  Box,
  Stack,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { CompetitionDataSummary } from "../../core/types/CompetitionDetail";
import CompetitionSummaryCard from "../../components/Competition/Summary";
import prisma from "../../lib/prisma";

export async function getServerSideProps() {
  let competitions = await prisma.competition.findMany({
    include: {
      groups: true,
    },
  });
  competitions = JSON.parse(JSON.stringify(competitions))

  return { props: { competitions } };
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
        // direction={{ base: "row", md: "row" }}
        align="center"
        justify="center"
      >
        <Box as={"header"} m={1} p={1}>
          <Heading>Discover Competitions</Heading>
        </Box>
        <Box>
          <CompetitionSummaryView competitions={competitions} />
        </Box>
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
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }}>
          {competitions.map((competition) => (
            <CompetitionSummaryCard competition={competition} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default CompetitionDiscovery;
