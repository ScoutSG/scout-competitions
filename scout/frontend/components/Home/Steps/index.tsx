import { ReactElement } from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  VStack,
  chakra,
  Button,
  Heading,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
// import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Box borderWidth={"1px"} borderRadius={10} p={5}>
      <Stack>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={"gray.300"}
          mb={1}
        >
          {icon}
        </Flex>
        <Text fontWeight={600}>{title}</Text>
        <Text color={"gray.600"}>{text}</Text>
      </Stack>
    </Box>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Box p={4}>
      <VStack align="center" justify="center" spacing="20px" mb={10}>
        <Heading size="lg" fontWeight="700">
          How does Scout work?
        </Heading>
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={ChevronRightIcon} w={10} h={10} />}
          title={"Set up your profile"}
          text={
            "This allows group mates to be able to contact you for further clarification and team forming"
          }
        />
        <Feature
          icon={<Icon as={ChevronRightIcon} w={10} h={10} />}
          title={"Discover New Competitions"}
          text={
            "Find the competitions that best fit your skills and compete with a winning team"
          }
        />
        <Feature
          icon={<Icon as={ChevronRightIcon} w={10} h={10} />}
          title={"Check Your Application Status"}
          text={
            "Check to see if the group of your interest has accepted your application to join the team"
          }
        />
      </SimpleGrid>
    </Box>
  );
}
