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

const GroupSummaryTab = ({
  competition,
  groups,
}: {
  competition: CompetitionData;
  groups: GroupSummaryData[];
}) => {
  return (
    <Stack spacing={8} alignItems="center">
      <Flex width="100%" maxWidth="4xl" alignItems="flex-end">
        <Text
          fontSize="lg"
          textAlign="center"
          textColor={useColorModeValue("gray.500", "gray.300")}
        >
          Showing {groups.length} groups
        </Text>
        <Spacer />
        <Link href={`/competitions/${competition.id}/groups`}>
          <Button
            leftIcon={<PlusSquareIcon />}
            colorScheme="cyan"
            variant="ghost"
          >
            Lead a team
          </Button>
        </Link>
      </Flex>
      {groups.map((group) => {
        return <GroupSummaryCard key={group.id} group={group} />;
      })}
    </Stack>
  );
};

export default GroupSummaryTab;
