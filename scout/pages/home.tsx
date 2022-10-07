import React from "react";
import NextLink from "next/link";
import {
  Box,
  SimpleGrid,
  Icon,
  VStack,
  Heading,
  Button,
} from "@chakra-ui/react";
import Step from "../components/Step";
import { ChevronRightIcon } from "@chakra-ui/icons";

const SimpleThreeColumns: React.FC = () => {
  return (
    <Box p={4}>
      <VStack align="center" justify="center" spacing="20px" mb={10}>
        <Heading>Get Started</Heading>
      </VStack>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
        <Step
          icon={<Icon as={ChevronRightIcon} w={10} h={10} />}
          title={"Set up your profile"}
          text={
            "Group mates will be able to contact you for further clarification and team forming"
          }
          href="/profile"
        />
        <Step
          icon={<Icon as={ChevronRightIcon} w={10} h={10} />}
          title={"Discover New Competitions"}
          text={
            "Find the competitions that best fit your skills and compete with a winning team"
          }
          href="/competitions"
        />
        <Step
          icon={<Icon as={ChevronRightIcon} w={10} h={10} />}
          title={"Check Your Application Status"}
          text={
            "Check to see if the group of your interest has accepted your application to join the team"
          }
          href="/applications"
        />
      </SimpleGrid>
    </Box>
  );
};

export default SimpleThreeColumns;
