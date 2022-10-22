import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Didymus Ne",
    email: "test1@gmail.com",
    updatedAt: new Date(Date.now()),
    school: "NUS",
    yearOfStudy: 3,
    major: "Biz + CS",
    specialisation: "Data Analytics",
    skills: ["Marketing", "React", "Prisma"]
  },
  {
    name: "Lye Wen Jun",
    email: "test2@gmail.com",
    updatedAt: new Date(Date.now()),
    school: "NUS",
    yearOfStudy: 3,
    major: "CS",
    specialisation: "Computer Networking",
    skills: ["Computer Networks", "React", "Product Design"]
  },
  {
    name: "Lee Yong Ler",
    email: "test3@gmail.com",
    updatedAt: new Date(Date.now()),
    school: "NUS",
    yearOfStudy: 3,
    major: "CS",
    specialisation: "Artificial Intelligence",
  }
]

const competitionData: Prisma.CompetitionCreateInput[] = [
    {
        name: "The Proveg Food Innovation Challenge",
        deadline: "2022-10-25T00:00:00+08:00",
        organiserName: "Proveg International",
        description: "Our food choices have a significant impact on our health, society, and the environment. A plant-based diet is a multiproblem solution to several key global problems, including climate change, food security, animal welfare, and health and pandemics.\n\n In response to the global transition towards plant-rich sustainable living, ProVeg International launched the inaugural Food Innovation Challenge in China in 2020, with the 2021 Challenge expanded to include South-East Asia. For the 2022 edition of the competition, we have set our sights on the entire Asia-Pacific (APAC) region.\n\n The Food Innovation Challenge will allow students to gain valuable insight into an exciting and fast-growing industry, while channelling their creativity and skills towards solving some of the biggest challenges facing the world today. We invite university students from all academic disciplines to take part in the challenge.\n\n The competition will once again be held online this year in order to allow students from all over the APAC region to participate.",
        link: "https://food-innovation-challenge.proveg.com/",
        maxSize: 4,
        minSize: 2,
        firstPrize: "USD 3,000",
        secondPrize: "USD 1,500",
        thirdPrize: "USD 1,000",
        otherPrizes: "USD 200 for 5 finalists"
    },
    {
        name: "Neuron Global Hackathon",
        deadline: "2022-10-29T00:00:00+08:00",
        organiserName: "Neuron",
        description: "Come shape the future of shared micromobility with the power of data in Neuron’s first-ever Global Hackathon! With anonymised trip data from Neuron, we’d like to invite YOU to develop an operational plan by creating an algorithm to optimise rental e-scooter and e-bike services. Contestants will be judged on operational efficiency, market growth and compliance to regulatory requirements. \n\n The global data science competition is open to all full-time or part-time students from universities or colleges in Australia, Canada, New Zealand, Singapore, and the United Kingdom. Stand to be among the top teams to win cash prizes and internship opportunities at Neuron’s world-class Data team!",
        link: "https://www.rideneuron.com/hackathon-2022/",
        maxSize: 4,
        minSize: 1,
        firstPrize: "SGD 3,000",
        secondPrize: "SGD 1,000",
        thirdPrize: "SGD 500",
    }
]

const groupData: Prisma.GroupCreateInput[] = [
  {
    name: "Knockout Tanks",
    currentSize: 2,
    targetSize: 4, 
    description: "We're Year 3 CS students looking for a suitable teammate for this competition. I have a great idea for this competition that has a lot of potential. Let me know if you're interested!",
    targetSkills: [
      "Presentation Skills", "Copywriter"
    ],
    competition: {
      connect: {
        id: 1
      }
    },
    leader: {
      connect: {
        id: 1
      }
    },
    members: {
      connect: {
        id: 2
      }
    },
    goal: "Win the competition",
  },
  {
    name: "Nunchuck Racoons",
    currentSize: 1,
    targetSize: 3,
    description: "I'm a Year 3 CS student looking for teammates to join this competition together! I'm mainly looking to gain some experience and try it out. Let me know if you're interested!",
    competition: {
      connect: {
        id: 1
      }
    },
    goal: "Apply existing skills",
    leader: {
      connect: {
        id: 3
      }
    }
  }
]

async function main() {
  console.log(`Start seeding ...`);
  // for (const u of userData) {
  //   const user = await prisma.user.create({
  //     data: u
  //   })
  //   console.log(`Created user with id: ${user.id}`)
  // }
  for (const c of competitionData) {
    const competition = await prisma.competition.create({
        data: c
    });
    console.log(`Created competition with id: ${competition.id}`)
  }
  // for (const g of groupData) {
  //   const group = await prisma.group.create({
  //     data: g
  //   });
  //   console.log(`Created group with id: ${group.id}`)
  // }
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
