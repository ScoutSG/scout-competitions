import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  CompetitionData,
  GroupSummaryData,
} from "../../core/types/CompetitionDetail";
import GroupSummaryCard from "./GroupSummaryCard";
import useIsMember from "./useIsMemberOfCompetition";
import useAnalyticsTracker from "../../lib/hooks/useAnalyticsTracker";

const GroupSummary = ({
  competition,
  groups,
}: {
  competition: CompetitionData;
  groups: GroupSummaryData[];
}) => {
  return (
    <Stack width="100%" spacing={8}>
      <Flex width="100%">
        <Text
          fontSize="lg"
          textAlign="center"
          textColor={useColorModeValue("gray.500", "gray.300")}
        >
          Showing {groups.length} group{groups.length === 1 ? "" : "s"}
        </Text>
      </Flex>
      {groups.map((group) => {
        return <GroupSummaryCard key={group.id} group={group} />;
      })}
    </Stack>
  );
};

export default GroupSummary;
