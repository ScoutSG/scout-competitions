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
} from "@chakra-ui/react";

import { GroupSummaryData } from "../../../types/CompetitionDetail";

const GroupSummaryCard: React.FC<{ group: GroupSummaryData }> = ({ group }) => {
  return (
    <Center py={2}>
      <Box w={"full"} boxShadow={"xl"} rounded={"md"} p={6} overflow={"hidden"}>
        <Stack>
          <Text
            color={"secondary"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
          >
            {group.targetSize - group.size} spots left!
          </Text>
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
          <Text
            // color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
          >
            Skills Team is looking for
          </Text>
          <Box maxH="70px" overflow="auto">
            {group.targetSkills.map((skill) => (
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
                m={1}
              >
                #{skill}
              </Badge>
            ))}
          </Box>
        </Stack>
        <Stack direction={"column"} mt={6} spacing={2} w={"full"}>
          <Button>Apply</Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default GroupSummaryCard;
