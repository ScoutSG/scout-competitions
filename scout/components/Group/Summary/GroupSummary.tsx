import React, { useState, useEffect } from "react";

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
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { TbSend } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/router";
import { GroupSummaryData } from "../../../core/types/CompetitionDetail";
import { useIsMember } from "../../../lib/hooks/useUserDetails";
import ShareButton from "../../ShareButton";
import MemberCard from "../../MemberCard";
import InviteButton from "../../InviteButton";

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
    group.members.forEach((member) =>
      avatarIcons.push(
        <AvatarMemberDetails member={member} color="primaryLight" />
      )
    );
    for (let i = 0; i < group.targetSize - group.currentSize; i++) {
      avatarIcons.push(<Avatar />);
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
        // borderWidth={1}
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
                  <Badge
                    textTransform="capitalize"
                    colorScheme="green"
                    rounded="md"
                    px={4}
                    py={1}
                  >
                    {skill}
                  </Badge>
                ))}
              </Box>
            </Stack>
          )}
          {group.tags.length === 0 ? null : (
            <Stack spacing={2}>
              <Text fontWeight="semibold">Tags</Text>
              <Box>
                {group.tags.map((tag) => (
                  <Badge
                    textTransform="capitalize"
                    rounded="md"
                    px={4}
                    py={1}
                    colorScheme="teal"
                  >
                    {tag}
                  </Badge>
                ))}
              </Box>
            </Stack>
          )}
        </Stack>

        {isMember ? (
          <Stack direction="row">
            <ShareButton group={group} />
            <InviteButton group={group} />
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

const AvatarMemberDetails = ({ member, color }) => {
  const avatarImage = member.image;

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
      >
        <Avatar size={"xs"} src={avatarImage} bgColor={color} />
      </MenuButton>
      <MenuList width={"320px"} boxShadow={"2xl"}>
        <MemberCard member={member} isSmall={true} />
      </MenuList>
    </Menu>
  );
};

export default GroupSummaryCard;
