import React from "react";
import {
  Heading,
  Box,
  Stack,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";

import { CompetitionDataSummary } from "../../../core/types/CompetitionDetail";

import CompetitionSummaryCard from "../Summary";

const CompetitionDiscovery: React.FC = () => {
  let competitions: CompetitionDataSummary[] = [
    modelCompetition,
    modelCompetition,
    modelCompetition,
  ];
  return (
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

/**TODO: Delete */
const modelCompetition: CompetitionDataSummary = {
  id: 1,
  name: "Hack For Public Good 2023",
  deadline: "12 Dec 2022",
  organiserName: "OGP, GovTech",
  description:
    "Hack for Public Good is an annual fixture of OGP's way of work to keep us identifying and working on building tech to deliver public good in its various shapes and forms.",
  urlLink: "https://www.open.gov.sg/hackathon/2023/",
  maxSize: 6,
  minSize: 1,
};

export default CompetitionDiscovery;
