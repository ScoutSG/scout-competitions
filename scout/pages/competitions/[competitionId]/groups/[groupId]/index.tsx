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
import { TbPencil, TbTrash } from "react-icons/tb";
import { Group, QuestionsData } from "../../../../../core/types/Group";
import {
  useIsMember,
  useIsLeader,
} from "../../../../../lib/hooks/useUserDetails";
import { maxWidth } from "../../../../../core/utils/maxWidth";
import PageContainer from "../../../../../components/PageContainer";
import { useSession } from "next-auth/react";
import { useCustomToast } from "../../../../../lib/hooks/useCustomToast";
import useAnalyticsTracker from "../../../../../lib/hooks/useAnalyticsTracker";

const ModifyGroupButtons = () => {
  const router = useRouter();
  const { competitionId, groupId } = router.query;
  const { presentToast } = useCustomToast();
  const eventAnalyticsTracker = useAnalyticsTracker("Modify Group buttons");

  const handleDelete = async () => {
    await eventAnalyticsTracker("Delete group " + groupId);
    clientApi.delete(`/groups/${groupId}`).catch((err) => {
      presentToast({
        position: "top",
        title: "Error occured!",
        description: "Unable to delete group, please try again later!",
        status: "error",
      });
    });

    router.push(`/competitions/${competitionId}`);
  };

  return (
    <>
      <Link
        href={`/competitions/${competitionId}/groups/${groupId}/edit`}
        onClick={async () => {
          await eventAnalyticsTracker("Edit Group " + groupId);
        }}
      >
        <Button width="100%" leftIcon={<TbPencil />}>
          Edit Group
        </Button>
      </Link>
      <Popover>
        <PopoverTrigger>
          <Button width="100%" colorScheme="red" leftIcon={<TbTrash />}>
            Delete Group
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
              <Button colorScheme="red" onClick={handleDelete}>
                Confirm
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking", // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const groupId = context.params.groupId;
  const response = await clientApi.get(`/groups/${groupId}`);
  const group = response.data;

  const res = await clientApi.get(`/forms/${group.form.id}`);
  const questionsData = res.data;

  return { props: { group, questionsData }, revalidate: 60 };
}

const GroupDetail: React.FC = ({
  group,
  questionsData,
}: {
  group: Group;
  questionsData: QuestionsData;
  app: any;
}) => {
  console.log(group);
  const isLeader = useIsLeader(group.leaderId);
  const isMember = useIsMember(group.members);
  const session = useSession();

  return (
    <PageContainer>
      <Head>
        <title>{group.name} - Scout</title>
      </Head>

      <Center>
        <Stack
          spacing={10}
          py={5}
          px={{ base: 4, md: 10 }}
          direction={{ base: "column", md: "row" }}
          w="full"
          maxW={maxWidth}
        >
          <Stack flex={5} direction="column" spacing={6} px={4}>
            <Stack spacing={3}>
              <Flex justifyContent="space-between" alignItems="center">
                <Heading fontWeight="black">{group.name}</Heading>
                <Badge px={4}>
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
              <Application questionsData={questionsData} />
            )}
            {isMember || isLeader ? (
              <Stack spacing={4}>
                <Heading size="md" fontWeight="black">
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
          <Stack flex={2} rounded="md" px={4} w={"full"}>
            <Heading size="md" fontWeight="black">
              Group Details
            </Heading>

            <Text
              color={"secondary"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
            >
              {group.targetSize - group.currentSize} spots left!
            </Text>
            <Text>{group.description}</Text>
            {group.targetSkills.length === 0 ? null : (
              <>
                <Text fontWeight={800}>Looking for</Text>
                <Box>
                  {group.targetSkills.map((skill) => (
                    <Badge textTransform="capitalize">{skill}</Badge>
                  ))}
                </Box>
              </>
            )}
            {group.tags.length === 0 ? null : (
              <>
                <Text fontWeight={800}>Tags</Text>
                <Box>
                  {group.tags.map((tag) => (
                    <Badge textTransform="capitalize">{tag}</Badge>
                  ))}
                </Box>
              </>
            )}
            {isMember || isLeader ? <ModifyGroupButtons /> : null}
          </Stack>
        </Stack>
      </Center>
    </PageContainer>
  );
};

export default GroupDetail;
