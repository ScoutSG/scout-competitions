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
} from "@chakra-ui/react";

import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { TbPencil, TbTrash } from "react-icons/tb";
import ApplicationReview from "../../../../../components/Group/ApplicationReview";
import Application from "../../../../../components/Group/Application";
import clientApi from "../../../../../core/api/client";
import { checkUserIsMember } from "../../../../../core/utils/isMember";
import { Group, QuestionsData } from "../../../../../core/types/Group";
import { useSession } from "next-auth/react";
import { userIsMember } from "../../../../../lib/hooks/useUserDetails";

const ModifyGroupButtons = () => {
  const router = useRouter();
  const { competition_id, group_id } = router.query;

  const handleDelete = async () => {
    const response = clientApi.delete(`/groups/${group_id}`);
    router.push(`/competitions/${competition_id}`);
  };

  return (
    <ButtonGroup>
      <Link href={`/competitions/${competition_id}/groups/${group_id}/edit`}>
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
    </ButtonGroup>
  );
};

export async function getServerSideProps(context) {
  const group_id = context.params.group_id;
  const response = await clientApi.get(`/groups/${group_id}`);
  const group = response.data;

  const res = await clientApi.get(`/forms/${group_id}`);
  const questionsData = res.data;

  return { props: { group, questionsData } };
}

const GroupDetail: React.FC = ({
  group,
  questionsData,
}: {
  group: Group;
  questionsData: QuestionsData;
  app: any;
}) => {
  const isMember = userIsMember(group.members);

  return (
    <>
      <Head>
        <title>{group.name} - Scout</title>
      </Head>
      <Stack
        spacing={10}
        py={{ base: 5, md: 10 }}
        px={4}
        direction={{ base: "column", md: "row" }}
        justify="center"
      >
        <Stack flex={2} px={4} maxW="1260px">
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
            {group.targetSize - group.currentSize} spots left!
          </Text>
          <Text>{group.description}</Text>
          {group.targetSkills.length === 0 ? null : (
            <>
              <Text
                textTransform={"uppercase"}
                fontWeight={800}
                fontSize={"sm"}
              >
                Looking for
              </Text>
              <Box>
                {group.targetSkills.map((skill) => (
                  <Badge px={2} py={1} bg={"gray.50"} fontWeight={"400"} m={1}>
                    #{skill}
                  </Badge>
                ))}
              </Box>
            </>
          )}
          {isMember ? <ModifyGroupButtons /> : null}
        </Stack>
        <Flex flex={3} bgColor="gray.50" rounded="md" p={4} w={"full"}>
          {isMember ? (
            <ApplicationReview applications={group.applications} />
          ) : (
            <Application questionsData={questionsData} />
          )}
        </Flex>
      </Stack>
    </>
  );
};

export default GroupDetail;
