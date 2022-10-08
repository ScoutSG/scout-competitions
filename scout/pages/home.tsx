import React from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  Heading,
  Stack,
  AspectRatio,
} from "@chakra-ui/react";
import Step from "../components/Step";
import { ChevronRightIcon } from "@chakra-ui/icons";

const SimpleThreeColumns: React.FC = () => {
  return (
    <Stack w="100%" spacing={0}>
      <Stack spacing={10} p={10} pb={20} bgColor="primary.500" align="center">
        <Box maxW="1500px">
          <Heading pb={10} color="gray.50" shadow="sm">
            Get Started
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
            <Step
              icon={<Icon as={ChevronRightIcon} w={10} h={10} />}
              title={"First, set up your profile"}
              text={
                "Group mates will be able to contact you for further clarification and team forming"
              }
              href="/profile"
              // bgColor="primary.500"
            />
            <Step
              icon={<Icon as={ChevronRightIcon} w={10} h={10} />}
              title={"Next, discover competitions"}
              text={
                "Find the competitions that best fit your skills and compete with a winning team"
              }
              href="/competitions"
              // bgColor="secondary"
            />
            <Step
              icon={<Icon as={ChevronRightIcon} w={10} h={10} />}
              title={"Last, check your status"}
              text={
                "Check to see if the group of your interest has accepted your application to join the team"
              }
              href="/applications"
            />
          </SimpleGrid>
        </Box>
      </Stack>
      <Stack
        spacing={10}
        p={10}
        pb={20}
        bgColor="secondaryLight"
        align="center"
      >
        <Box maxW="1500px">
          <Heading pb={10} shadow="sm">
            Follow Scout on social media
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
            <AspectRatio
              w={"85vw"}
              maxW="750px"
              minH="500px"
              ratio={1.5}
              rounded="md"
            >
              <iframe
                src="https://www.linkedin.com/embed/feed/update/urn:li:share:6984118388629417984"
                frameBorder="0"
                allowFullScreen={true}
                title="LinkedIn"
              />
            </AspectRatio>
          </SimpleGrid>
        </Box>
      </Stack>
    </Stack>
  );
};

export default SimpleThreeColumns;
