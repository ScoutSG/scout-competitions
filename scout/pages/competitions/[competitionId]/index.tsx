import clientApi from "../../../core/api/client";
import { AxiosResponse } from "axios";
import CompetitionDetails from "../../../components/CompetitionDetails";

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

export default CompetitionDetails;
