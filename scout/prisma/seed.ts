import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const competitionData: Prisma.CompetitionCreateInput[] = [
    {
        "name": "The Proveg Food Innovation Challenge",
        "deadline": "2022-10-25T00:00:00+08:00",
        "organiserName": "Proveg International",
        "description": "Our food choices have a significant impact on our health, society, and the environment. A plant-based diet is a multiproblem solution to several key global problems, including climate change, food security, animal welfare, and health and pandemics. In response to the global transition towards plant-rich sustainable living, ProVeg International launched the inaugural Food Innovation Challenge in China in 2020, with the 2021 Challenge expanded to include South-East Asia. For the 2022 edition of the competition, we have set our sights on the entire Asia-Pacific (APAC) region. The Food Innovation Challenge will allow students to gain valuable insight into an exciting and fast-growing industry, while channelling their creativity and skills towards solving some of the biggest challenges facing the world today. We invite university students from all academic disciplines to take part in the challenge. The competition will once again be held online this year in order to allow students from all over the APAC region to participate.",
        "link": "https://food-innovation-challenge.proveg.com/",
        "maxSize": 4,
        "minSize": 2,
        "firstPrize": "USD 3,000",
        "secondPrize": "USD 1,500",
        "thirdPrize": "USD 1,000",
        "otherPrizes": "USD 200 for 5 finalists"
    },
    {
        "name": "Neuron Global Hackathon",
        "deadline": "2022-10-29T00:00:00+08:00",
        "organiserName": "Neuron",
        "description": "Come shape the future of shared micromobility with the power of data in Neuron’s first-ever Global Hackathon! With anonymised trip data from Neuron, we’d like to invite YOU to develop an operational plan by creating an algorithm to optimise rental e-scooter and e-bike services. Contestants will be judged on operational efficiency, market growth and compliance to regulatory requirements. The global data science competition is open to all full-time or part-time students from universities or colleges in Australia, Canada, New Zealand, Singapore, and the United Kingdom. Stand to be among the top teams to win cash prizes and internship opportunities at Neuron’s world-class Data team!",
        "link": "https://www.rideneuron.com/hackathon-2022/",
        "maxSize": 4,
        "minSize": 1,
        "firstPrize": "SGD 3,000",
        "secondPrize": "SGD 1,000",
        "thirdPrize": "SGD 500",
    }
]

async function main() {
  console.log(`Start seeding ...`);
  for (const c of competitionData) {
    const competition = await prisma.competition.create({
        data: c
    });
    console.log(`Created competition with id: ${competition.id}`)
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
