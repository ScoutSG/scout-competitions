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

import { GroupSummaryData } from "../../../core/types/CompetitionDetail";
import { ReactElement } from "react-markdown/lib/react-markdown";

const GroupSummaryCard: React.FC<{ group: GroupSummaryData }> = ({ group }) => {
  let groupSize: number = group.size;
  let targetSize: number = group.targetSize;
  console.log(group);

  let avatarIcons: ReactElement[] = [];
  for (let i = 0; i < targetSize; i++) {
    if (i < groupSize) {
      avatarIcons.push(<Avatar bgColor="primaryLight" />);
    } else {
      avatarIcons.push(<Avatar />);
    }
  }

  const isMember = false;

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
          <Text textTransform={"capitalize"} fontWeight={800} fontSize={"sm"}>
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
        </Stack>
        <Stack direction={"column"} mt={6} spacing={2} w={"full"}>
          <Button
            rightIcon={groupSize === targetSize || isMember ? null : <TbSend />}
            disabled={groupSize === targetSize && !isMember}
          >
            {isMember
              ? "View Group"
              : groupSize === targetSize
              ? "Team is full"
              : "Request to join"}
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default GroupSummaryCard;
