import {
  Badge,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { modelGroup } from "../../../models/Group";
import ApplicationReview from "../ApplicationReview";
import Application from "../Application";

const GroupDetail: React.FC = () => {
  const router = useRouter();
  /* TODO: Add if-else logic to differentiate if member / leader
        Member can see Application requests for Review
        Non-member can see Application Questions to request to join
    */
  const isMember = false;
  const group = modelGroup;
  return (
    <Stack
      spacing={10}
      py={{ base: 5, md: 28 }}
      direction={{ base: "column", md: "row" }}
    >
      <Stack flex={2}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="xl">
            {group.name}
          </Heading>
          <Badge px={4}>{isMember ? "Member" : null}</Badge>
        </Flex>
        <Text
          color={"secondary"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"sm"}
        >
          {group.targetSize - group.size} spots left!
        </Text>
        <Text>{group.description}</Text>
        <Text textTransform={"uppercase"} fontWeight={800} fontSize={"sm"}>
          Skills Team is Looking for
        </Text>
        <Box>
          {group.targetSkills.map((skill) => (
            <Badge px={2} py={1} bg={"gray.50"} fontWeight={"400"} m={1}>
              #{skill}
            </Badge>
          ))}
        </Box>
      </Stack>
      <Flex flex={3}>
        {isMember ? (
          <ApplicationReview applications={group.applications} />
        ) : (
          <Application />
        )}
      </Flex>
    </Stack>
  );
};

export default GroupDetail;
