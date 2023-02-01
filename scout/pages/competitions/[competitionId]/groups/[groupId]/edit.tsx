import clientApi from "../../../../../core/api/client";
import CreateOrEditGroup from "../../../../../components/CreateOrEditGroup";

export async function getServerSideProps(context) {
  const { competitionId, groupId } = context.params;
  let competition = null;
  let group = null;
  let form = null;

  console.log("---------------");
  console.log(competition);
  console.log(group);
  console.log("---------------");

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

export default CreateOrEditGroup;
