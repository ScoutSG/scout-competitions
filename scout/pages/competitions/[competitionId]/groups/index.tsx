import CreateGroup from "../../../../components/CreateOrEditGroup";
import prisma from "../../../../lib/prisma";

export async function getServerSideProps(context) {
  const competitionId = parseInt(context.params.competitionId);

  let competition = null;
  if (Number.isInteger(competitionId)) {
    competition = await prisma.competition.findUnique({
      where: {
        id: competitionId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        minSize: true,
        maxSize: true,
      },
    });
  }

  return {
    props: { competition: JSON.parse(JSON.stringify(competition)) },
  };
}

export default CreateGroup;
