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
} from "@chakra-ui/react";
import { TbSend } from "react-icons/tb";

import { GroupSummaryData } from "../../../core/types/CompetitionDetail";

const GroupSummaryCard: React.FC<{ group: GroupSummaryData }> = ({ group }) => {
  return (
    <Center py={2}>
      <Box w={"full"} boxShadow={"xl"} rounded={"md"} p={6} overflow={"hidden"}>
        <Stack>
          {/**TODO: Color Icons */}
          <Stack>
            <Avatar size="xs" />
            <Text color={"secondary"} fontWeight={800} fontSize={"sm"}>
              Color icons
            </Text>
          </Stack>
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {group.name}
          </Heading>
          <Text color={"gray.700"}>{group.description}</Text>
          <Text color={"gray.500"} fontSize="xs">
            Led by {group.leader.name}, Year {group.leader.year},{" "}
            {group.leader.major} Major, {group.leader.specialization}{" "}
            Specialization
          </Text>
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
          <Button rightIcon={<TbSend />}>Request to join</Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default GroupSummaryCard;
