import React from "react";
import {
  Heading,
  Box,
  Stack,
  Text,
  Button,
  Center,
  Icon,
  Divider,
  Badge,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { VscOctoface } from "react-icons/vsc";
import NextLink from "next/link";
import Head from "next/head";
import GroupSummaryCard from "../../../components/Group/Summary";
import clientApi from "../../../core/api/client";
import { AxiosResponse } from "axios";
import { CompetitionData } from "../../../core/types/CompetitionDetail";
import { formatDate } from "../../../core/utils/date";
import { useIsMember } from "../../../lib/hooks/useUserDetails";
import { maxWidth } from "../../../core/utils/maxWidth";
import { TbChevronRight, TbClock } from "react-icons/tb";

const describeGroupSizeRestriction = (min: number, max: number) => {
  if (min === null && max === null) {
    return "There are no restrictions on the group size.";
  } else if (min === null) {
    return `Groups can only be formed with a maximum size of ${max} members`;
  } else if (max === null) {
    return `Groups must have a minimum size of ${min} members`;
  } else {
    return `Groups are restricted to ${min} - ${max} members`;
  }
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking", // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const competitionId = context.params.competitionId;
  let response: AxiosResponse<any, any>;
  try {
    response = await clientApi.get(`/competitions/${competitionId}`);
  } catch (err) {
    return { notFound: true };
  }
  const competition = response.data;

  return { props: { competition }, revalidate: 60 };
}

const CompetitionDetails = ({
  competition,
}: {
  competition: CompetitionData | null;
}) => {
  const onSeeMore = () => {
    window.open(competition.link, "_blank");
  };

  // front end validation
  const isMemberOfCompetition = useIsMember(
    (competition.groups as any[]).flatMap((group) => group.members)
  );

  return (
    <Box bgColor="gray.50">
      <Head>
        <title>{competition.name} - Scout</title>
      </Head>
      <Center>
        <Stack
          maxW={maxWidth}
          py={5}
          px={{ base: 4, md: 10 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack direction="column" spacing={8} flex={3} px={4}>
            <Stack spacing={4}>
              <Box as={"header"} w="100%">
                <Heading fontWeight="black">{competition.name}</Heading>
              </Box>
              <Stack direction="row" spacing={4}>
                {competition.organiserName === "" ? null : (
                  <Badge
                    w="fit-content"
                    py={1}
                    px={2}
                    colorScheme="green"
                    textTransform="capitalize"
                  >
                    <Stack direction="row" align="center">
                      <Icon as={VscOctoface} />
                      <Text>Organised by {competition.organiserName}</Text>
                    </Stack>
                  </Badge>
                )}
                <Stack direction="row" align="center" color="red.400">
                  <Icon as={TbClock} />
                  <Text fontWeight="semibold">
                    Sign Up by {formatDate(competition.deadline)}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
            <Divider borderColor="gray.500" />
            <Stack spacing={2}>
              <Heading size="md" fontWeight="black">
                About
              </Heading>
              <Text>{competition.description}</Text>
            </Stack>
            <Stack spacing={2}>
              <Heading size="md" fontWeight="black">
                Restrictions
              </Heading>

              <Stack direction="row" align="center" spacing={1}>
                <UnorderedList>
                  <ListItem>
                    {describeGroupSizeRestriction(
                      competition.minSize,
                      competition.maxSize
                    )}
                  </ListItem>
                </UnorderedList>
              </Stack>
            </Stack>
            <Divider borderColor="gray.500" />

            <Stack spacing={2}>
              <Heading size="md" fontWeight="black">
                Participating groups
              </Heading>
              <Text>
                {competition.groups.length} group
                {competition.groups.length === 1 ? "" : "s"} found
              </Text>
            </Stack>
            {competition.groups.length === 0 ? (
              <>
                <Text>No groups have been formed yet!</Text>
                <Stack spacing={4}>
                  <Heading size="md" fontWeight="black">
                    Can't find a suitable team?
                  </Heading>
                  <NextLink href={`/competitions/${competition.id}/groups`}>
                    <Button
                      rightIcon={<TbChevronRight />}
                      bgColor="primary.500"
                      color="white"
                      _hover={{ bgColor: "gray.200", color: "primary.500" }}
                    >
                      Lead a team now
                    </Button>
                  </NextLink>
                </Stack>
              </>
            ) : (
              (competition.groups as any[]).map((group) => (
                <GroupSummaryCard
                  group={group}
                  isMemberOfCompetition={isMemberOfCompetition}
                />
              ))
            )}
          </Stack>
          <Stack flex={1} px={4}>
            <NextLink href={`/competitions/${competition.id}/groups`}>
              <Button
                rightIcon={<TbChevronRight />}
                color="white"
                bg={"primary.500"}
                _hover={{ color: "primaryLight", bg: "gray.200" }}
                w="full"
                disabled={isMemberOfCompetition}
              >
                Lead a team
              </Button>
            </NextLink>
            <Button rightIcon={<TbChevronRight />} onClick={onSeeMore} w="full">
              Visit organiser website
            </Button>
          </Stack>
        </Stack>
      </Center>
    </Box>
  );
};

export default CompetitionDetails;
