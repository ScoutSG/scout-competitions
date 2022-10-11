import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const competitionData: Prisma.CompetitionCreateInput[] = [
    {
        "name": "2022 Huawei Antenna Innovation Cup",
        "deadline": "2022-10-18T00:00:00+08:00",
        "organiserName": "Huawei",
        "description": "Huawei Antenna Innovation Cup (HAC) is a student competition for key challenges in antenna applications. The contest topics cover antenna technologies of base stations and terminal devices, involving macro base stations, micro base stations, microwave, millimeter wave, terminal antennas, etc. HAC is a global technical competition open to students all over the world.",
        "link": "https://competition.huaweicloud.com/information/1000041739/introduction",
        "maxSize": 3,
        "minSize": 1
    },
    {
        "name": "The Proveg Food Innovation Challenge",
        "deadline": "2022-10-25T00:00:00+08:00",
        "organiserName": "Proveg International",
        "description": "Our food choices have a significant impact on our health, society, and the environment. A plant-based diet is a multiproblem solution to several key global problems, including climate change, food security, animal welfare, and health and pandemics. In response to the global transition towards plant-rich sustainable living, ProVeg International launched the inaugural Food Innovation Challenge in China in 2020, with the 2021 Challenge expanded to include South-East Asia. For the 2022 edition of the competition, we have set our sights on the entire Asia-Pacific (APAC) region. The Food Innovation Challenge will allow students to gain valuable insight into an exciting and fast-growing industry, while channelling their creativity and skills towards solving some of the biggest challenges facing the world today. We invite university students from all academic disciplines to take part in the challenge. The competition will once again be held online this year in order to allow students from all over the APAC region to participate.",
        "link": "https://food-innovation-challenge.proveg.com/",
        "maxSize": 4,
        "minSize": 2
    },
    {
        "name": "Lee Kuan Yew School of Public Policy Case Writing Competition",
        "deadline": "2022-10-14T00:00:00+08:00",
        "organiserName": "Lee Kuan Yew School of Public Policy",
        "description": "The LKYSPP CASE WRITING COMPETITION aims to provide NUS students with the opportunity to showcase their ability to apply public policy knowledge through the writing of public policy case study concerning contemporary issues in Asia. The Case Writing Competition (“Competition”) is organised by the LKYSPP Case Study Unit (“Organiser”).",
        "link": "https://lkyspp.nus.edu.sg/research/case-study-unit/case-writing-competition/case-writing-competition-2022",
        "maxSize": 3,
        "minSize": 1
    },
    {
        "name": "Neuron Global Hackathon",
        "deadline": "2022-10-29T00:00:00+08:00",
        "organiserName": "Neuron",
        "description": "Come shape the future of shared micromobility with the power of data in Neuron’s first-ever Global Hackathon! With anonymised trip data from Neuron, we’d like to invite YOU to develop an operational plan by creating an algorithm to optimise rental e-scooter and e-bike services. Contestants will be judged on operational efficiency, market growth and compliance to regulatory requirements. The global data science competition is open to all full-time or part-time students from universities or colleges in Australia, Canada, New Zealand, Singapore, and the United Kingdom. Stand to be among the top teams to win cash prizes and internship opportunities at Neuron’s world-class Data team!",
        "link": "https://www.rideneuron.com/hackathon-2022/",
        "maxSize": 4,
        "minSize": 1
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
