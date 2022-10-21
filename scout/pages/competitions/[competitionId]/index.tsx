import CompetitionDetails from "../../../components/CompetitionDetails";
import prisma from "../../../lib/prisma";

export async function getStaticPaths() {
  // const competitions = await prisma.competition.findMany({
  //   select: {
  //     id: true,
  //   },
  // });

  // const paths = competitions.map((competition) => ({
  //   params: { competitionId: String(competition.id) },
  // }));

  // return {
  //   paths: paths,
  //   fallback: "blocking",
  // };
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const competitionId = parseInt(context.params.competitionId);
  const competition = await prisma.competition.findUnique({
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
              skills: true
            }
          },
          members: {
            select: {
              name: true,
              image: true,
              school: true,
              yearOfStudy: true,
              major: true,
              skills: true
            }
          }
        }
      }
    }
  });

  return {
    props: { competition: JSON.parse(JSON.stringify(competition)) },
    revalidate: 60,
  };
}

export default CompetitionDetails;
