import React from "react";
import { Box, Center, Heading, Text, Stack } from "@chakra-ui/react";
import { CompetitionDataSummary } from "../../../core/types/CompetitionDetail";
import AboutCard from "../AboutCard";
import { daysLeft } from "../../../core/utils/date";

const CompetitionSummaryCard: React.FC<{
  competition: CompetitionDataSummary;
}> = ({ competition }) => {
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
            {daysLeft(competition.deadline)} days left!
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
