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
import CompetitionInformation from "./CompetitionInformation";
import GroupSummaryCard from "./GroupSummaryCard";
import useIsMember from "./useIsMember";
import useAnalyticsTracker from "../../lib/hooks/useAnalyticsTracker";

const GroupSummaryTab = ({
  competition,
  groups,
}: {
  competition: CompetitionData;
  groups: GroupSummaryData[];
}) => {
  const { isMember } = useIsMember(competition.id);
  const eventAnalyticsTracker = useAnalyticsTracker(
    "Group Summary Tab for " + competition.name
  );

  return (
    <Flex gap={{ base: 0, xl: 8 }}>
      <Stack
        width={{ base: "100%", xl: "60%" }}
        spacing={8}
        alignItems={{ base: "center", xl: "left" }}
      >
        <Flex width="100%" maxWidth="4xl" alignItems="flex-end">
          <Text
            fontSize="lg"
            textAlign="center"
            textColor={useColorModeValue("gray.500", "gray.300")}
          >
            Showing {groups.length} group{groups.length === 1 ? "" : "s"}
          </Text>
          <Spacer />
          <Link href={`/competitions/${competition.id}/groups`}>
            <Button
              leftIcon={<PlusSquareIcon />}
              colorScheme="cyan"
              variant="outline"
              visibility={isMember ? "hidden" : "visible"}
              onClick={async () => {
                await eventAnalyticsTracker(
                  "Lead a team for " + competition.name
                );
              }}
            >
              Lead a team
            </Button>
          </Link>
        </Flex>
        {groups.map((group) => {
          return <GroupSummaryCard key={group.id} group={group} />;
        })}
      </Stack>
      <CompetitionInformation competition={competition} xlDisplay="none" />
    </Flex>
  );
};

export default GroupSummaryTab;
