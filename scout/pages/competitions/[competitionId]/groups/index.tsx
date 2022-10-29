import CreateGroup from "../../../../components/CreateOrEditGroup";
import prisma from "../../../../lib/prisma";

export async function getStaticPaths() {
  const competitions = await prisma.competition.findMany({
    select: {
      id: true,
    },
  });

  const paths = competitions.map((competition) => ({
    params: { competitionId: String(competition.id) },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const competitionId = parseInt(context.params.competitionId);

  let competition = null;
  if (Number.isInteger(competitionId)) {
    competition = await prisma.competition.findUnique({
      where: {
        id: competitionId,
      },
      select: {
        name: true,
        description: true,
        minSize: true,
        maxSize: true
      }
    });
  }

  return {
    props: { competition: JSON.parse(JSON.stringify(competition)) },
    revalidate: 60,
  };
}

export default CreateGroup;
