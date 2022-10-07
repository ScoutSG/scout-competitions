import React from "react";

import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Badge,
  Button,
} from "@chakra-ui/react";

import AboutCard from "../AboutCard";
import { CompetitionDataSummary } from "../../../core/types/CompetitionDetail";
import { ChevronRightIcon } from "@chakra-ui/icons";

const CompetitionSummaryCard: React.FC<{
  competition: CompetitionDataSummary;
}> = ({ competition }) => {
  competition = {
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

  return (
    <Center py={2}>
      <Box w={"full"} boxShadow={"xl"} rounded={"md"} p={6} overflow={"hidden"}>
        <Stack direction="column" spacing={4}>
          <Text
            color={"secondary"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
          >
            {/* TODO: calculate number of days left */}
            {} days left!
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {competition.name}
          </Heading>
          <AboutCard data={competition} />
        </Stack>
      </Box>
    </Center>
  );
};

export default CompetitionSummaryCard;
