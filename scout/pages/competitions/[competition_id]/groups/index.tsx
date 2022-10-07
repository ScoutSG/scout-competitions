import React from "react";
import { Heading, Box, Stack, Flex } from "@chakra-ui/react";
import Head from "next/head";
import {
  CompetitionData,
  GroupSummaryData,
} from "../../../../core/types/CompetitionDetail";
import AboutCard from "../../../../components/Competition/AboutCard";

const CompetitionDetails: React.FC = () => {
  const response: CompetitionData = {
    id: 123,
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
    <>
      <Head>
        <title>{response.name} - Scout</title>
      </Head>
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
            <AboutCard data={response} hideFindATeam />
          </Box>
        </Stack>
        <Flex
          flex={3}
          justify={"center"}
          // align={"center"}
          position={"relative"}
          w={"100%"}
        ></Flex>
      </Stack>
    </>
  );
};

/** TO DELETE */
const modelGroup: GroupSummaryData = {
  id: 1,
  name: "Scout",
  size: 2,
  targetSize: 6,
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
