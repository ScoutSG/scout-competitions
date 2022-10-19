import CompetitionDiscovery from "../../components/CompetitionDiscovery";
import prisma from "../../lib/prisma";

export async function getStaticProps() {
  let competitions = await prisma.competition.findMany({
    include: {
        groups: true
    },
    where: {
      deadline: {
        gte: new Date(Date.now())
      }
    },
    orderBy: {
      deadline: 'asc'
    }
  });

  return {
    props: {
      competitions: JSON.parse(JSON.stringify(competitions)),
    },
    revalidate: 60,
  };
}

export default CompetitionDiscovery;
