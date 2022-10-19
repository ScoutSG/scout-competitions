import React from "react";
// import NextLink from "next/link";
// import {
//   Stack,
//   Flex,
//   Box,
//   Heading,
//   Text,
//   Button,
//   useColorModeValue,
//   Stat,
//   StatLabel,
//   StatNumber,
//   SimpleGrid,
//   Center,
// } from "@chakra-ui/react";
// import { ChevronRightIcon } from "@chakra-ui/icons";
// import Blob from "../components/Blob";
// import CTAVector from "../core/Icons/CTAVector";
// import { maxWidth } from "../core/utils/maxWidth";
import PageContainer from "../components/PageContainer";
import LandingPage from "../components/LandingPage";

// interface CardProps {
//   title: string;
//   stat: string;
// }
// const Card = (props: CardProps) => {
//   const { title, stat } = props;
//   return (
//     <Stat
//       px={{ base: 4, md: 8 }}
//       py={"5"}
//       shadow={"xl"}
//       rounded={"lg"}
//       bg="gray.50"
//     >
//       <StatLabel fontWeight={"medium"} fontSize="lg">
//         {title}
//       </StatLabel>
//       <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
//         {stat}
//       </StatNumber>
//     </Stat>
//   );
// };

const Index = () => {
  return (
    <PageContainer>
      <LandingPage />
      {/*
      <Center>
        <Stack
          p={10}
          align={"center"}
          spacing={{ base: 10, md: 10 }}
          direction={{ base: "column", md: "row" }}
          maxW={maxWidth}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text as={"span"} position={"relative"} fontSize={"7xl"}>
                Form a dream team,
              </Text>
              <br />
              <Text as={"span"} color={"primary.500"} fontSize={"7xl"}>
                Use Scout!
              </Text>
            </Heading>
            <Text color={"gray.600"} fontWeight="400" fontSize={"xl"}>
              Students shouldn't be disadvantaged at competitions or lessons
              because they cannot find a group to take part with. Scout helps
              you form or find a team that complements you.
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <NextLink href="/competitions">
                <Button
                  rounded={"full"}
                  size={"lg"}
                  fontWeight={"bold"}
                  px={6}
                  color="white"
                  bg={"primary.500"}
                  _hover={{ color: "primaryLight", bg: "gray.200" }}
                  rightIcon={<ChevronRightIcon />}
                >
                  Get Started Now
                </Button>
              </NextLink>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Blob
              w={"150%"}
              h={"100%"}
              position={"absolute"}
              zIndex={-1}
              color={useColorModeValue("blue.50", "blue.400")}
            />
            <Box>
              <CTAVector />
            </Box>
          </Flex>
        </Stack>
      </Center>
      <Box
        w="100%"
        mx={"auto"}
        py={10}
        px={{ base: 2, sm: 12, md: 17 }}
        bg="primaryLight"
      >
        <Center>
          <Stack spacing={0} maxW={maxWidth}>
            <Heading
              as="h1"
              textAlign={"center"}
              fontSize={"4xl"}
              fontWeight={"bold"}
              color="white"
              pb={10}
            >
              What can you do with Scout?
            </Heading>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={{ base: 5, lg: 8 }}
            >
              <Card title={"Discover"} stat={"relevant competitions"} />
              <Card
                title={"Find"}
                stat={"strangers who share the same passion"}
              />
              <Card
                title={"Form"}
                stat={"teams that can complement your skills"}
              />
            </SimpleGrid>
          </Stack>
        </Center>
      </Box>
  */}
    </PageContainer>
  );
};

export default Index;
