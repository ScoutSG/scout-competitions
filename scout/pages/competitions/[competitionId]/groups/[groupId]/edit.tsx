import React from "react";
import { Heading, Box, Stack, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { CompetitionData } from "../../../../../core/types/CompetitionDetail";
import AboutCard from "../../../../../components/Competition/AboutCard";
import clientApi from "../../../../../core/api/client";
import CreateOrEditGroupForm from "../../../../../components/Group/CreateOrEditGroupForm";
import { Form, Group } from "../../../../../core/types/Group";
import PageContainer from "../../../../../components/PageContainer";
import NotFound from "../../../../_error";

export async function getServerSideProps(context) {
  const { competitionId, groupId } = context.params;
  let competition = null;
  let group = null;
  let form = null;

  try {
    const [competitionResponse, groupResponse] = await Promise.all([
      clientApi.get(`/competitions/${competitionId}`),
      clientApi.get(`/groups/${groupId}`),
    ]);

    competition = competitionResponse.data;
    group = groupResponse.data;

    if (group) {
      const formResponse = await clientApi.get(`/forms/${group.form.id}`);
      form = formResponse.data;
    }
  } catch (err) {}

  return { props: { competition, group, form } };
}

type EditGroupProps = {
  competition: CompetitionData;
  group: Group;
  form: Form;
};

const EditGroup = ({ competition, group, form }: EditGroupProps) => {
  if (!group) {
    return <NotFound />;
  }
  return (
    <PageContainer>
      <Head>
        <title>{competition.name} - Scout</title>
      </Head>
      <Stack
        spacing={10}
        py={5}
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
