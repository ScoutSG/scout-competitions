import React from "react";
import {
  Heading,
  Box,
  Container,
  Stack,
  Text,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";

import SearchBar from "../../SearchBar";
import { CompetitionData } from "../../../frontend/types/Competition";

const CompetitionDetails: React.FC = () => {
  const groups = [];

  const response: CompetitionData = {
    name: "Hack For Public Good 2023",
    deadline: "12 Dec 2022",
    organiserName: "OGP, GovTech",
    description:
      "Hack for Public Good is an annual fixture of OGP's way of work to keep us identifying and working on building tech to deliver public good in its various shapes and forms.",
    maxSize: 6,
    minSize: 1,
  };

  return (
    <>
      <Box borderWidth="1px" borderRadius="0.75rem" m={1} p={6}>
        <Heading>{response.name}</Heading>
      </Box>
      <AboutCard
        name={response.name}
        deadline={response.deadline}
        organiserName={response.organiserName}
        description={response.description}
        maxSize={response.maxSize}
        minSize={response.minSize}
      />
      <Box borderWidth="1px" borderRadius="0.75rem" m={1} p={6}>
        <Stack spacing={4}>
          <Box>
            <Heading size="md">Groups</Heading>
          </Box>
          <Box>
            <SearchBar />
          </Box>
        </Stack>
        <Box>
          {groups.map((group) => (
            <div></div>
          ))}
        </Box>
      </Box>
    </>
  );
};

const AboutCard: React.FC<CompetitionData> = (props) => {
  const {
    name,
    deadline,
    organiserName,
    description,
    maxSize,
    minSize,
  } = props;

  return (
    <Box borderWidth="1px" borderRadius="0.75rem" m={1} p={6}>
      <Stack spacing={4}>
        <Box>
          <Heading size="md">About</Heading>
          <Text>{description}</Text>
        </Box>

        <SimpleGrid columns={3} minChildWidth="90px">
          <Box>
            <Heading size="xs">Deadline</Heading>
            <Badge>{deadline}</Badge>
          </Box>

          <Box>
            <Heading size="xs">Group Size</Heading>
            <Badge>
              {minSize === null && maxSize === null
                ? "Unrestricted"
                : minSize === null
                ? maxSize
                : maxSize === null
                ? minSize
                : minSize + " - " + maxSize}
            </Badge>
          </Box>

          <Box>
            <Heading size="xs">Organiser</Heading>
            <Badge>{organiserName}</Badge>
          </Box>
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default CompetitionDetails;
