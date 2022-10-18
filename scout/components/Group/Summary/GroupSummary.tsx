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
import { useIsMember } from "../../../lib/hooks/useUserDetails";
import ShareButton from "../../ShareButton";

const GroupSummaryCard = ({
  group,
  isMemberOfCompetition,
}: {
  group: GroupSummaryData;
  isMemberOfCompetition: boolean;
}) => {
  const router = useRouter();
  const isMember = useIsMember(group.members);
  const groupLink = `/competitions/${router.query.competitionId}/groups/${group.id}`;

  const getAvatarIcons = () => {
    let avatarIcons: React.ReactElement[] = [];
    for (let i = 0; i < group.targetSize; i++) {
      if (i < group.currentSize) {
        avatarIcons.push(<Avatar bgColor="primaryLight" />);
      } else {
        avatarIcons.push(<Avatar />);
      }
    }

    return avatarIcons;
  };

  return (
    <Center py={2}>
      <Stack
        w={"full"}
        rounded="xl"
        px={2}
        py={2}
        overflow={"hidden"}
        spacing={2}
        borderWidth={1}
        _hover={{ bgColor: "gray.100" }}
        borderColor="gray.400"
      >
        <Stack spacing={2}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
          >
            <Heading fontSize={"lg"} fontWeight="black">
              {group.name}
            </Heading>

            <AvatarGroup size="xs" max={4} spacing={0.25} fontSize="10px">
              {getAvatarIcons().map((avatar) => avatar)}
            </AvatarGroup>
          </Stack>

          {group.description?.length > 0 ? (
            <Stack spacing={2}>
              <Text fontWeight="bold">Description</Text>
              <Text>{group.description}</Text>
            </Stack>
          ) : null}

          {group.targetSkills.length === 0 ? null : (
            <Stack spacing={2}>
              <Text fontWeight="semibold">We're looking for</Text>
              <Box>
                {group.targetSkills.map((skill) => (
                  <Badge textTransform="capitalize">{skill}</Badge>
                ))}
              </Box>
            </Stack>
          )}
          {group.tags.length === 0 ? null : (
            <Stack spacing={2}>
              <Text fontWeight="semibold">Tags</Text>
              <Box>
                {group.tags.map((tag) => (
                  <Badge textTransform="capitalize">{tag}</Badge>
                ))}
              </Box>
            </Stack>
          )}
        </Stack>

        {isMember ? (
          <Stack direction="row">
            <ShareButton group={group} />
            <Link href={groupLink}>
              <Button color="primary.500" bgColor="transparent" _hover={{}}>
                View group
              </Button>
            </Link>
          </Stack>
        ) : group.currentSize === group.targetSize ? (
          <Button disabled>Team is full</Button>
        ) : (
          <Link href={groupLink}>
            <Button
              leftIcon={<TbSend />}
              w="fit-content"
              color="primary.500"
              bgColor="transparent"
              _hover={{}}
              disabled={isMemberOfCompetition}
            >
              Request to join
            </Button>
          </Link>
        )}
      </Stack>
    </Center>
  );
};

export default GroupSummaryCard;
