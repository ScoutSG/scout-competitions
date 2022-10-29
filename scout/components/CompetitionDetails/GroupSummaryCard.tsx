import {
  Stack,
  useColorModeValue,
  Text,
  Wrap,
  Spacer,
  Button,
  Divider,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { Group } from "../../core/types/Group";
import GroupMember from "./GroupMember";
import GroupGoal from "./GroupGoal";
import useIsMemberOfCompetition from "./useIsMember";
import { useIsMember, useIsLeader } from "../../lib/hooks/useUserDetails";
import useAnalyticsTracker from "../../lib/hooks/useAnalyticsTracker";

const GroupSummaryCard = ({ group }: { group: Group }) => {
  const { isMember } = useIsMemberOfCompetition(group.competitionId);
  const isPartOfGroup =
    useIsMember(group.members) || useIsLeader(group.leaderId);
  const eventAnalyticsTracker = useAnalyticsTracker(
    "Group Summary Card for " + group.name
  );

  var groupSkills = group.members.concat(group.leader).flatMap((member) => {
    return member.skills;
  });
  groupSkills = Array.from(new Set(groupSkills));

  const viewButton = (
    <Button
      as="a"
      href={`/competitions/${group.competitionId}/groups/${group.id}`}
      variant="outline"
      colorScheme="cyan"
      visibility="hidden"
      _groupHover={{ visibility: "visible" }}
      size="md"
      onClick={async () => {
        if (!isMember) {
          await eventAnalyticsTracker("Request to join group " + group.name);
        } else if (isPartOfGroup) {
          await eventAnalyticsTracker("View own group " + group.name);
        }
      }}
    >
      {!isMember ? "Request to join" : "View group"}
    </Button>
  );

  return (
    <Stack
      width="100%"
      maxWidth="4xl"
      p={8}
      rounded="md"
      borderWidth="1px"
      _hover={{
        borderColor: useColorModeValue("gray.300", "gray.500"),
        boxShadow: "md",
      }}
      role="group"
    >
      <Wrap align="flex-end">
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="semibold"
        >
          {group.name}
        </Text>
        <Spacer />
        {!isMember || isPartOfGroup ? viewButton : null}
      </Wrap>
      <Stack pt={2}>
        <Text>{group.description}</Text>
        <Stack
          spacing={2}
          pt={4}
          pb={groupSkills.length > 0 || group.targetSkills.length > 0 ? 4 : 0}
        >
          <Text fontWeight="medium">
            Members ({group.members.length}/{group.targetSize})
          </Text>
          {group.members &&
            group.members.map((member, index) => {
              return (
                <GroupMember
                  key={index.toString()}
                  member={member}
                  role={member.id === group.leaderId ? "Leader" : ""}
                />
              );
            })}
          <GroupGoal goal={group.goal} />
        </Stack>
        {(groupSkills.length > 0 || group.targetSkills.length > 0) && (
          <Divider />
        )}
        {groupSkills.length > 0 && (
          <>
            <Stack pt={2} pb={4}>
              <Text fontWeight="medium">We're strong in</Text>
              <Wrap spacing={2}>
                {groupSkills.map((skill) => {
                  return (
                    <Tag
                      key={skill}
                      rounded="xl"
                      bgColor={useColorModeValue("red.50", "red.700")}
                    >
                      <TagLabel>{skill}</TagLabel>
                    </Tag>
                  );
                })}
              </Wrap>
            </Stack>
          </>
        )}
        {group.targetSkills.length > 0 && (
          <>
            <Stack pt={2}>
              <Text fontWeight="medium">We're looking for</Text>
              <Wrap spacing={2}>
                {group.targetSkills.map((skill) => {
                  return (
                    <Tag
                      key={skill}
                      rounded="xl"
                      bgColor={useColorModeValue("blue.50", "blue.700")}
                    >
                      <TagLabel>{skill}</TagLabel>
                    </Tag>
                  );
                })}
              </Wrap>
            </Stack>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default GroupSummaryCard;
