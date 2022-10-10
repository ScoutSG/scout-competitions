import React from "react";
import { Heading, Box, Stack, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { CompetitionData } from "../../../../core/types/CompetitionDetail";
import AboutCard from "../../../../components/Competition/AboutCard";
import clientApi from "../../../../core/api/client";
import CreateOrEditGroupForm from "../../../../components/Group/CreateOrEditGroupForm";

export async function getServerSideProps(context) {
  const competition_id = context.params.competition_id;
  const response = await clientApi.get(`/competitions/${competition_id}`);
  const competition = response.data;
  return { props: { competition } };
}

type CreateGroupProps = {
  competition: CompetitionData;
};

const CreateGroup = ({ competition }: CreateGroupProps) => {
  return (
    <>
      <Head>
        <title>{competition.name} - Scout</title>
      </Head>
      <Stack
        spacing={10}
        py={{ base: 5, md: 16 }}
        px={{ base: 4, md: 10 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={2} spacing={{ base: 1, md: 4 }}>
          <Box as={"header"}>
            <Heading>{competition.name}</Heading>
          </Box>
          <Box>
            <AboutCard data={competition} hideFindATeam />
          </Box>
        </Stack>
        <Flex
          flex={5}
          justify={"center"}
          position={"relative"}
          w={"100%"}
          bgColor="gray.50"
          p={4}
        >
          <CreateOrEditGroupForm competition={competition} />
        </Flex>
      </Stack>
    </>
  );
};

export default CreateGroup;
