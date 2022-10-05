import React from "react";
import {
  Heading,
  Box,
  Container,
  Stack,
  Text,
  Badge,
  SimpleGrid,
  Flex,
  Button,
} from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";

import SearchBar from "../../SearchBar";
import { CompetitionData } from "../../../types/Competition";

const CompetitionDetails: React.FC = () => {
  const groups = [];

  const response: CompetitionData = {
    name: "Hack For Public Good 2023",
    deadline: "12 Dec 2022",
    organiserName: "OGP, GovTech",
    description:
      "Hack for Public Good is an annual fixture of OGP's way of work to keep us identifying and working on building tech to deliver public good in its various shapes and forms.",
    urlLink: "https://www.open.gov.sg/hackathon/2023/",
    maxSize: 6,
    minSize: 1,
  };

  return (
    <Stack
      spacing={10}
      py={{ base: 5, md: 28 }}
      direction={{ base: "column", md: "row" }}
    >
      <Stack flex={1} spacing={{ base: 1, md: 10 }}>
        <Box as={"header"} m={1} p={{ base: 1, md: 6 }}>
          <Heading>{response.name}</Heading>
        </Box>
        <AboutCard
          name={response.name}
          deadline={response.deadline}
          organiserName={response.organiserName}
          description={response.description}
          urlLink={response.urlLink}
          maxSize={response.maxSize}
          minSize={response.minSize}
        />
      </Stack>
      <Flex
        flex={1}
        justify={"center"}
        // align={"center"}
        position={"relative"}
        w={"100%"}
      >
        <Box
          borderWidth="1px"
          borderRadius="0.75rem"
          m={1}
          p={{ base: 3, md: 6 }}
          w={"100%"}
        >
          <Stack spacing={4}>
            <Box>
              <Heading size="md">Groups</Heading>
            </Box>
            <Box>{/* <SearchBar /> */}</Box>
          </Stack>
          <Box>
            {groups.map((group) => (
              <div></div>
            ))}
          </Box>
        </Box>
      </Flex>
    </Stack>
  );
};

const AboutCard: React.FC<CompetitionData> = (props) => {
  const {
    name,
    deadline,
    organiserName,
    description,
    urlLink,
    maxSize,
    minSize,
  } = props;

  const onSeeMore = () => {
    window.open(urlLink, "_blank");
  };

  return (
    <Box m={1} p={{ base: 1, md: 6 }}>
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
        <Button
          rightIcon={<ChevronRightIcon />}
          w={{ base: "full", md: "fit-content" }}
          onClick={onSeeMore}
        >
          See More
        </Button>
      </Stack>
    </Box>
  );
};

export default CompetitionDetails;
