import React from "react";
import {
  Heading,
  Box,
  Stack,
  Text,
  Badge,
  SimpleGrid,
  Flex,
  Button,
} from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";

import SearchBar from "../../../components/SearchBar";
import {
  CompetitionData,
  GroupSummaryData,
  CompetitionAboutCard,
} from "../../../core/types/CompetitionDetail";

import GroupSummaryCard from "../../../components/Group/Summary";

const CompetitionDetails: React.FC = () => {
  const response: CompetitionData = {
    name: "Hack For Public Good 2023",
    deadline: "12 Dec 2022",
    organiserName: "OGP, GovTech",
    description:
      "Hack for Public Good is an annual fixture of OGP's way of work to keep us identifying and working on building tech to deliver public good in its various shapes and forms.",
    urlLink: "https://www.open.gov.sg/hackathon/2023/",
    maxSize: 6,
    minSize: 1,
    groups: [modelGroup, modelGroup, modelGroup, modelGroup],
  };

  return (
    <Stack
      spacing={10}
      py={{ base: 5, md: 28 }}
      direction={{ base: "column", md: "row" }}
    >
      <Stack flex={2} spacing={{ base: 1, md: 10 }}>
        <Box as={"header"} m={1} p={{ base: 1, md: 6 }}>
          <Heading>{response.name}</Heading>
        </Box>
        <Box m={1} p={{ base: 2, md: 7 }}>
          <AboutCard
            deadline={response.deadline}
            organiserName={response.organiserName}
            description={response.description}
            urlLink={response.urlLink}
            maxSize={response.maxSize}
            minSize={response.minSize}
          />
        </Box>
      </Stack>
      <Flex
        flex={3}
        justify={"center"}
        // align={"center"}
        position={"relative"}
        w={"100%"}
      >
        <GroupSummaryView groups={response.groups} />
      </Flex>
    </Stack>
  );
};

const GroupSummaryView: React.FC<{ groups: GroupSummaryData[] }> = ({
  groups,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="0.75rem"
      m={1}
      p={{ base: 3, md: 6 }}
      w={"100%"}
    >
      <Stack spacing={10} direction="row" align="center">
        <Box>
          <Heading size="md">Groups</Heading>
        </Box>
        {/* <Box>
          <SearchBar />
        </Box> */}
        {groups.length === 0 ? null : (
          <Box>
            <Button
              rightIcon={<ChevronRightIcon />}
              color="white"
              bg={"primary.500"}
              _hover={{ color: "primaryLight", bg: "gray.200" }}
            >
              Lead a team
            </Button>
          </Box>
        )}
      </Stack>
      {groups.length === 0 ? (
        <Stack spacing={4} mt={10}>
          <Text>No groups have been formed yet!</Text>
          <Heading size="md">Want to participate?</Heading>
          <Button rightIcon={<ChevronRightIcon />}>Lead a team now</Button>
        </Stack>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }}>
          {groups.map((group) => (
            <GroupSummaryCard group={group} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export const AboutCard: React.FC<CompetitionAboutCard> = (props) => {
  const { deadline, organiserName, description, urlLink, maxSize, minSize } =
    props;

  const onSeeMore = () => {
    window.open(urlLink, "_blank");
  };

  return (
    <Box>
      <Stack spacing={4}>
        <Box>
          <Heading size="md">About</Heading>
          <Text>{description}</Text>
        </Box>

        <SimpleGrid columns={3} minChildWidth="90px">
          <Box>
            <Heading size="xs">Deadline</Heading>
            <Badge borderRadius={"7px"}>{deadline}</Badge>
          </Box>

          <Box>
            <Heading size="xs">Group Size</Heading>
            <Badge borderRadius={"7px"}>
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
            <Badge borderRadius={"7px"}>{organiserName}</Badge>
          </Box>
        </SimpleGrid>
        <Button
          rightIcon={<ChevronRightIcon />}
          w={{ base: "full", md: "fit-content" }}
          onClick={onSeeMore}
          fontSize="small"
        >
          Visit site
        </Button>
      </Stack>
    </Box>
  );
};

/** TO DELETE */
const modelGroup: GroupSummaryData = {
  id: 1,
  name: "Scout",
  size: 1,
  targetSize: 4,
  description: "This is a test group ",
  targetSkills: ["React", "Next", "Spring Boot", "UX Design", "Figma"],
  leader: {
    name: "Lye Wen Jun",
    year: 3,
    major: "Computer Science",
    specialization: "Database",
  },
};

export default CompetitionDetails;
