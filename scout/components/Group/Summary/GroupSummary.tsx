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
  Avatar,
  AvatarGroup,
} from "@chakra-ui/react";
import { TbSend } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/router";

import { GroupSummaryData } from "../../../core/types/CompetitionDetail";
import { userIsMember } from "../../../lib/hooks/useUserDetails";

const GroupSummaryCard: React.FC<{ group: GroupSummaryData }> = ({ group }) => {
  const router = useRouter();
  const groupLink = `/competitions/${router.query.competition_id}/groups/${group.id}`;
  let groupSize: number = group.currentSize;
  let targetSize: number = group.targetSize;

  let avatarIcons: React.ReactElement[] = [];
  for (let i = 0; i < targetSize; i++) {
    if (i < groupSize) {
      avatarIcons.push(<Avatar bgColor="primaryLight" />);
    } else {
      avatarIcons.push(<Avatar />);
    }
  }

  const isMember = userIsMember(group.members);
  

  return (
    <Center py={2}>
      <Box w={"full"} boxShadow={"xl"} rounded={"md"} p={6} overflow={"hidden"}>
        <Stack>
          <Stack
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
          >
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {group.name}
            </Heading>
            <AvatarGroup size="xs" max={4} spacing={0.25} fontSize="10px">
              {avatarIcons.map((avatar) => avatar)}
            </AvatarGroup>
          </Stack>

          <Text color={"gray.700"}>{group.description}</Text>
          {/* <Text color={"gray.500"} fontSize="xs">
            Led by {group.leader.name}, Year {group.leader.year},{" "}
            {group.leader.major} Major, {group.leader.specialization}{" "}
            Specialization
          </Text> */}
        </Stack>

        <Stack direction={"column"} mt={6} align="center">
          {group.targetSkills.length === 0 ? null : (
            <>
              <Text
                textTransform={"capitalize"}
                fontWeight={800}
                fontSize={"sm"}
              >
                Looking for
              </Text>
              <Box maxH="70px" overflow="auto">
                {group.targetSkills.map((skill) => (
                  <Badge
                    px={2}
                    py={1}
                    bg={useColorModeValue("gray.50", "gray.800")}
                    fontWeight={"400"}
                    m={1}
                    textTransform="capitalize"
                  >
                    #{skill}
                  </Badge>
                ))}
              </Box>
            </>
          )}
        </Stack>
        <Stack direction={"column"} mt={6} spacing={2} w={"full"}>
          {isMember ? (
            <Link href={groupLink}>
              <Button>View group</Button>
            </Link>
          ) : groupSize === targetSize ? (
            <Button disabled>Team is full</Button>
          ) : (
            <Link href={groupLink}>
              <Button rightIcon={<TbSend />}>Request to join</Button>
            </Link>
          )}
        </Stack>
      </Box>
    </Center>
  );
};

export default GroupSummaryCard;
