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
import useIsMember from "./useIsMember";
import Link from "next/link";

const GroupSummaryCard = ({ group }: { group: Group }) => {
  const { isMember } = useIsMember(group.competitionId);

  var groupSkills = group.members.concat(group.leader).flatMap((member) => {
    return member.skills;
  });
  groupSkills = Array.from(new Set(groupSkills));

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
        <Text fontSize={{base: "xl", md: "2xl"}} fontWeight="semibold" color={useColorModeValue("cyan.900", "white")}>
          {group.name}
        </Text>
        <Spacer />
        <Link href={`/competitions/${group.competitionId}/groups/${group.id}`}>
          <Button
            variant="outline"
            colorScheme="cyan"
            visibility="hidden"
            _groupHover={{ visibility: isMember ? "hidden" : "visible" }}
            size="md"
          >
            Request to Join
          </Button>
        </Link>
      </Wrap>
      <Stack pt={2}>
        <Stack spacing={2} pb={4}>
          <Text fontWeight="medium">Description</Text>
          <Text>{group.description}</Text>
        </Stack>
        <Divider />
        <Stack
          spacing={2}
          pt={2}
          pb={groupSkills.length > 0 || group.targetSkills.length > 0 ? 4 : 0}
        >
          <Text fontWeight="medium">
            Members ({group.members.length + 1}/{group.targetSize})
          </Text>
          <GroupMember
            key={group.leader.email}
            member={group.leader}
            role="Leader"
          />
          {group.members &&
            group.members.map((member, index) => {
              return (
                <GroupMember key={index.toString()} member={member} role="" />
              );
            })}
          <GroupGoal goal={group.goal} />
        </Stack>
        {groupSkills.length > 0 && (
          <>
            <Divider />
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
