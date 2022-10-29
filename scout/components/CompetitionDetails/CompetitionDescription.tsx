import {
  Box,
  Divider,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CompetitionData, GroupSummaryData } from "../../core/types/CompetitionDetail";
import CompetitionInformation from "./CompetitionInformation";
import GroupSummaryTab from "./GroupSummary";
import Linkify from "react-linkify";

const CompetitionDescription = ({
  competition,
}: {
  competition: CompetitionData;
  groups: GroupSummaryData[];
}) => {
  return (
    <Flex
      align="flex-start"
      flexDirection={{ base: "column-reverse", xl: "row" }}
      gap={{ base: 4, xl: 8 }}
    >
      <Stack width={{ base: "100%", xl: "60%" }} pr={8}>
        <Text fontSize="xl" fontWeight="semibold">
          About
        </Text>
        <Linkify>
          {competition.description.split("\\n").map((text) => (
            <Text whiteSpace="pre-line">{text}</Text>
          ))}
        </Linkify>
        <Box height={4} />
        <Divider />
        <Box height={4} />
        <Text fontSize="xl" fontWeight="semibold">
          Groups
        </Text>
        <GroupSummaryTab
          competition={competition}
          groups={competition.groups}
        />
      </Stack>
      <CompetitionInformation competition={competition} />
    </Flex>
  );
};

export default CompetitionDescription;
