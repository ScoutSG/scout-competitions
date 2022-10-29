import CompetitionDetails from "../../../components/CompetitionDetails";
import prisma from "../../../lib/prisma";

export async function getServerSideProps(context) {
  const competitionId = parseInt(context.params.competitionId);

  let competition = null;
  if (Number.isInteger(competitionId)) {
    competition = await prisma.competition.findUnique({
      where: {
        id: competitionId,
      },
      include: {
        groups: {
          include: {
            leader: {
              select: {
                name: true,
                image: true,
                school: true,
                yearOfStudy: true,
                major: true,
                skills: true,
              },
            },
            members: {
              select: {
                id: true,
                name: true,
                image: true,
                school: true,
                yearOfStudy: true,
                major: true,
                skills: true,
              },
            },
          },
        },
      },
    });
  }

  return {
    props: { competition: JSON.parse(JSON.stringify(competition)) },
  };
}

export default CompetitionDetails;
