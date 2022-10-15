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
} from "@chakra-ui/react";
import { MdTimer, MdCircle } from "react-icons/md";
import { VscOctoface } from "react-icons/vsc";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import SearchBar from "../../../components/SearchBar";
import GroupSummaryCard from "../../../components/Group/Summary";
import NotFound from "../../../components/NotFound";
import Head from "next/head";
import clientApi from "../../../core/api/client";
import { AxiosResponse } from "axios";
import {
  CompetitionData,
  GroupSummaryData,
} from "../../../core/types/CompetitionDetail";
import { formatDate } from "../../../core/utils/date";

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

  return competition === null ? (
    <NotFound />
  ) : (
    <Box bgColor="gray.50">
      <Head>
        <title>{competition.name} - Scout</title>
      </Head>
      <Center>
        <Stack
          maxW="1260px"
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
                  <Icon as={MdTimer} />
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
                <Icon as={MdCircle} h="1" />

                <Text>
                  {competition.minSize === null && competition.maxSize === null
                    ? "There are no restrictions on the group size."
                    : competition.minSize === null
                    ? "Groups can only be formed with a maximum size of " +
                      competition.maxSize +
                      " members"
                    : competition.maxSize === null
                    ? "Groups must have a minimum size of " +
                      competition.minSize +
                      " members"
                    : "Groups are restricted to " +
                      competition.minSize +
                      " - " +
                      competition.maxSize +
                      " members"}
                </Text>
              </Stack>
            </Stack>
            <Divider borderColor="gray.500" />

            <Stack spacing={2}>
              <Heading size="md" fontWeight="black">
                Participating groups
              </Heading>
              <Text>{competition.groups.length} groups found</Text>
            </Stack>
            {competition.groups.length === 0 ? (
              <Stack spacing={4} mt={10}>
                <Text>No groups have been formed yet!</Text>
                <Heading size="md">Looking for a team?</Heading>
                <NextLink href={`/competitions/${competition.id}/groups`}>
                  <Button rightIcon={<ChevronRightIcon />}>
                    Lead a team now
                  </Button>
                </NextLink>
              </Stack>
            ) : (
              competition.groups.map((group) => (
                <GroupSummaryCard group={group} />
              ))
            )}
          </Stack>
          <Stack flex={1} px={4}>
            <NextLink href={`/competitions/${competition.id}/groups`}>
              <Button
                rightIcon={<ChevronRightIcon />}
                color="white"
                bg={"primary.500"}
                _hover={{ color: "primaryLight", bg: "gray.200" }}
                w="full"
              >
                Lead a team
              </Button>
            </NextLink>
            <Button
              rightIcon={<ChevronRightIcon />}
              onClick={onSeeMore}
              w="full"
            >
              Visit organiser website
            </Button>
          </Stack>
        </Stack>
      </Center>
    </Box>
  );
};

type GroupSummaryViewProps = {
  groups: GroupSummaryData[];
  id: number;
};

export default CompetitionDetails;
