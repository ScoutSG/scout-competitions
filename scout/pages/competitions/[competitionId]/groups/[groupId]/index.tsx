import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Box,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Center,
  Divider,
  HStack,
} from "@chakra-ui/react";

import Link from "next/link";
import Head from "next/head";
import ApplicationReview from "../../../../../components/Group/ApplicationReview";
import Application from "../../../../../components/Group/Application";
import MemberCard from "../../../../../components/MemberCard";
import ShareButton from "../../../../../components/ShareButton";
import InviteButton from "../../../../../components/InviteButton";
import clientApi from "../../../../../core/api/client";
import { useRouter } from "next/router";
import { TbBrandTelegram, TbPencil, TbTrash } from "react-icons/tb";
import { Form, Group } from "../../../../../core/types/Group";
import {
  useIsMember,
  useIsLeader,
} from "../../../../../lib/hooks/useUserDetails";
import { maxWidth } from "../../../../../core/utils/maxWidth";
import PageContainer from "../../../../../components/PageContainer";
import { useCustomToast } from "../../../../../lib/hooks/useCustomToast";
import useAnalyticsTracker from "../../../../../lib/hooks/useAnalyticsTracker";
import NotFound from "../../../../_error";
import Linkify from "../../../../../components/Linkify";
import prisma from "../../../../../lib/prisma";

const ModifyGroupButtons = () => {
  const router = useRouter();
  const { competitionId, groupId } = router.query;
  const { presentToast } = useCustomToast();
  const eventAnalyticsTracker = useAnalyticsTracker("Modify Group buttons");
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    await eventAnalyticsTracker("Delete group " + groupId);
    await clientApi
      .delete(`/groups/${groupId}`)
      .then(() => {
        presentToast({
          description: "Group deleted!",
          status: "success",
        });

        router.push(`/competitions/${competitionId}`);
      })
      .catch((err) => {
        presentToast({
          title: "Error occured!",
          description: err?.response?.data?.message || "",
          status: "error",
        });
      });
  };

  return (
    <ButtonGroup pt={4}>
      <Link
        href={`/competitions/${competitionId}/groups/${groupId}/edit`}
        onClick={async () => {
          await eventAnalyticsTracker("Edit Group " + groupId);
        }}
      >
        <Button width="50%" leftIcon={<TbPencil />}>
          Edit
        </Button>
      </Link>
      <Popover>
        <PopoverTrigger>
          <Button width="50%" colorScheme="red" leftIcon={<TbTrash />}>
            Delete
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Are you sure you want to delete your group? This action is
            irreversible.
          </PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button variant="outline">Cancel</Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                isLoading={isDeleteLoading}
              >
                Confirm
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  );
};

export async function getServerSideProps(context) {
  const groupId = parseInt(context.params.groupId as string);

  let group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      form: {
        include: {
          questions: true,
        },
      },
      members: true,
      applications: {
        include: {
          applicant: true,
          answers: {
            include: {
              question: true,
            },
          },
        },
      },
    },
  });

  let form = null;
  if (group) {
    group = JSON.parse(JSON.stringify(group));
    form = group.form;
  }

  return { props: { group, form } };
}

const GroupDetail = ({ group, form }: { group: Group; form: Form }) => {
  const isLeader = useIsLeader(group?.leaderId);
  const isMember = useIsMember(group?.members);
  const router = useRouter();

  if (
    !group ||
    group.competitionId !== parseInt(router.query.competitionId as string)
  ) {
    return <NotFound />;
  }

  return (
    <PageContainer>
      <Head>
        <title>{group.name} - Scout</title>
      </Head>

      <Center>
        <Stack
          spacing={8}
          py={8}
          px={{ base: 4, md: 8 }}
          direction={{ base: "column", md: "row" }}
          w="full"
          maxW={maxWidth}
        >
          <Stack flex={5} direction="column" spacing={8}>
            <Stack spacing={8}>
              <Flex justifyContent="space-between" alignItems="center">
                <Heading fontWeight="semibold">{group.name}</Heading>
                <Badge px={2} colorScheme={isLeader ? "red" : "blue"}>
                  {isLeader ? "Leader" : isMember ? "Member" : null}
                </Badge>
              </Flex>
              <Stack direction="row">
                {isMember || isLeader ? <InviteButton group={group} /> : null}
                {isMember || isLeader ? <ShareButton group={group} /> : null}
              </Stack>
            </Stack>

            <Divider />
            {isMember || isLeader ? (
              <ApplicationReview applications={group.applications} />
            ) : (
              <Application form={form} />
            )}
            {isMember || isLeader ? (
              <Stack spacing={4}>
                <Heading size="lg" fontWeight="semibold">
                  Members
                </Heading>
                <Stack>
                  {group.members.map((mbr) => (
                    <MemberCard member={mbr} />
                  ))}
                </Stack>
              </Stack>
            ) : null}
          </Stack>
          <Stack flex={2} rounded="md" px={4} w={"full"} spacing={4}>
            <Stack>
              <Heading size="lg" fontWeight="semibold">
                Group Details
              </Heading>

              <Text color={"gray.500"} fontWeight="medium" fontSize={"xl"}>
                {group.targetSize - group.currentSize} spots left
              </Text>
            </Stack>

            <Linkify>
              <Text>{group.description}</Text>
            </Linkify>
            {group.targetSkills.length === 0 ? null : (
              <Stack>
                <Text fontSize="lg" fontWeight="medium">
                  Looking for
                </Text>
                <HStack spacing={2}>
                  {group.targetSkills.map((skill) => (
                    <Badge textTransform="capitalize" colorScheme="blue">{skill}</Badge>
                  ))}
                </HStack>
              </Stack>
            )}
            {group.tags.length === 0 ? null : (
              <Stack>
                <Text fontWeight="medium" fontSize="xl">Tags</Text>
                <HStack spacing={2}>
                  {group.tags.map((tag) => (
                    <Badge textTransform="capitalize" colorScheme="orange">{tag}</Badge>
                  ))}
                </HStack>
              </Stack>
            )}
            {(isMember || isLeader) && group.telegramInviteLink ? (
              <>
                <Button
                  leftIcon={<TbBrandTelegram />}
                  colorScheme="telegram"
                  onClick={() =>
                    window.open(group.telegramInviteLink, "_blank")
                  }
                >
                  Join Telegram group
                </Button>
              </>
            ) : null}
            {isMember || isLeader ? <ModifyGroupButtons /> : null}
          </Stack>
        </Stack>
      </Center>
    </PageContainer>
  );
};

export default GroupDetail;
