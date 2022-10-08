import React from "react";

import LandingPage from "../components/LandingPage";
import NextLink from "next/link";
import {
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Icon,
  IconProps,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  chakra,
  SimpleGrid,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import CTAVector from "../core/Icons/CTAVector";

interface CardProps {
  title: string;
  stat: string;
}
const Card = (props: CardProps) => {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={"5"}
      shadow={"xl"}
      rounded={"lg"}
      bg="gray.50"
    >
      <StatLabel fontWeight={"medium"} fontSize="lg">
        {title}
      </StatLabel>
      <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
        {stat}
      </StatNumber>
    </Stat>
  );
};

const Index: React.FC = () => {
  return (
    <>
      <Stack
        p={10}
        align={"center"}
        spacing={{ base: 10, md: 10 }}
        direction={{ base: "column", md: "row" }}
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
            because they cannot find a group to take part with. Scout helps you
            form or find a team that complements you.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <NextLink href="/home">
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
      <Box
        w="100%"
        mx={"auto"}
        py={10}
        px={{ base: 2, sm: 12, md: 17 }}
        bg="primaryLight"
      >
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
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <Card title={"Discover"} stat={"relevant competitions"} />
          <Card title={"Find"} stat={"strangers who share the same passion"} />
          <Card title={"Form"} stat={"teams that can complement your skills"} />
        </SimpleGrid>
      </Box>
    </>
  );
};

export const Blob = (props: IconProps) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};

export default Index;
