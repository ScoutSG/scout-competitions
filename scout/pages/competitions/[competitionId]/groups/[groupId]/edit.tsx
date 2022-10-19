import React from "react";
import { Heading, Box, Stack, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { CompetitionData } from "../../../../../core/types/CompetitionDetail";
import AboutCard from "../../../../../components/Competition/AboutCard";
import clientApi from "../../../../../core/api/client";
import CreateOrEditGroupForm from "../../../../../components/Group/CreateOrEditGroupForm";
import { Form, Group } from "../../../../../core/types/Group";
import PageContainer from "../../../../../components/PageContainer";

export async function getServerSideProps(context) {
  const { competitionId, groupId } = context.params;
  const [competitionResponse, groupResponse] = await Promise.all([
    clientApi.get(`/competitions/${competitionId}`),
    clientApi.get(`/groups/${groupId}`),
  ]);

  const competition = competitionResponse.data;
  const group = groupResponse.data;

  const formResponse = await clientApi.get(`/forms/${group.form.id}`);
  const form = formResponse.data;

  return { props: { competition, group, form } };
}

type EditGroupProps = {
  competition: CompetitionData;
  group: Group;
  form: Form;
};

const EditGroup = ({ competition, group, form }: EditGroupProps) => {
  return (
    <PageContainer>
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
        <Flex flex={3} justify={"center"} position={"relative"} w={"100%"}>
          <CreateOrEditGroupForm
            competition={competition}
            group={group}
            form={form}
          />
        </Flex>
      </Stack>
    </PageContainer>
  );
};

export default EditGroup;
