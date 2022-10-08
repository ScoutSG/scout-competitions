import React from "react";
import {
  Heading,
  Box,
  Stack,
  Text,
  SimpleGrid,
  Flex,
  Button,
} from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

import SearchBar from "../../../components/SearchBar";
import {
  CompetitionData,
  GroupSummaryData,
} from "../../../core/types/CompetitionDetail";

import GroupSummaryCard from "../../../components/Group/Summary";
import NotFound from "../../../components/NotFound";
import Head from "next/head";
import AboutCard from "../../../components/Competition/AboutCard";
import clientApi from "../../../core/api/client";

export async function getServerSideProps(context) {
  const competition_id = context.params.competition_id;
  const response = await clientApi.get(`/competitions/${competition_id}`);
  const competition = response.data;
  return { props: { competition } };
}

const CompetitionDetails = ({
  competition,
}: {
  competition: CompetitionData | null;
}) => {
  return competition === null ? (
    <NotFound />
  ) : (
    <>
      <Head>
        <title>{competition.name} - Scout</title>
      </Head>
      <Stack
        spacing={10}
        py={{ base: 5, md: 16 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={2} spacing={{ base: 1, md: 10 }}>
          <Box as={"header"} m={1} p={{ base: 1, md: 6 }}>
            <Heading>{competition.name}</Heading>
          </Box>
          <Box m={1} p={{ base: 2, md: 7 }}>
            <AboutCard data={competition} hideFindATeam />
          </Box>
        </Stack>
        <Flex
          flex={3}
          justify={"center"}
          // align={"center"}
          position={"relative"}
          w={"100%"}
        >
          <GroupSummaryView groups={competition.groups} id={competition.id} />
        </Flex>
      </Stack>
    </>
  );
};

type GroupSummaryViewProps = {
  groups: GroupSummaryData[];
  id: number;
};

const GroupSummaryView = ({ groups, id }: GroupSummaryViewProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="0.75rem"
      m={1}
      p={{ base: 3, md: 6 }}
      w={"100%"}
    >
      <Stack spacing={10} direction="row" align="center">
        <Box>
          <Heading size="md">Groups</Heading>
        </Box>
        {/* <Box>
          <SearchBar />
        </Box> */}
        {groups.length === 0 ? null : (
          <Box>
            <Button
              rightIcon={<ChevronRightIcon />}
              color="white"
              bg={"primary.500"}
              _hover={{ color: "primaryLight", bg: "gray.200" }}
            >
              Lead a team
            </Button>
          </Box>
        )}
      </Stack>
      {groups.length === 0 ? (
        <Stack spacing={4} mt={10}>
          <Text>No groups have been formed yet!</Text>
          <Heading size="md">Looking for a team?</Heading>
          <NextLink href={`/competitions/${id}/groups`}>
            <Button rightIcon={<ChevronRightIcon />}>Lead a team now</Button>
          </NextLink>
        </Stack>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }}>
          {groups.map((group) => (
            <GroupSummaryCard group={group} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default CompetitionDetails;
