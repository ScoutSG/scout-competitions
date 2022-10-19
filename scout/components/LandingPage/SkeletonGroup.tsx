import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Spacer,
  Stack,
  Tag,
  TagLabel,
  Text,
  useColorModeValue,
  Wrap,
} from "@chakra-ui/react";
import { FaSchool } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";

const SkeletonGroup: React.FC = () => {
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const secondaryBgColor = useColorModeValue("gray.100", "gray.600");
  return (
    <Flex width={{base: "lg", md: "xl"}} pt={16} justifyContent="right" pr={{base: 0, md: 16}}>
      <Stack
        minWidth={{ base: "none", lg: "500px" }}
        bgColor={bgColor}
        boxShadow="lg"
        rounded="2xl"
        p={8}
      >
        <Wrap mb={2}>
          <Text fontSize="xl" fontWeight="semibold">
            Champion Team 🏆
          </Text>
          <Spacer />
          <Button>Request to Join</Button>
        </Wrap>
        <Divider />
        <Stack my={4} spacing={2}>
          <Text fontWeight="medium">Description</Text>
          <Box width="100%" height="20px" bgColor={secondaryBgColor} rounded="md" />
          <Box width="100%" height="20px" bgColor={secondaryBgColor} rounded="md" />
          <Text>We want 🫵</Text>
        </Stack>
        <Divider />
        <Stack my={4} spacing={2}>
          <Text fontWeight="medium">Members (2/3)</Text>
          <Wrap spacing={{ base: 2, md: 4 }}>
            <Avatar name="Xavier Lee" size="sm" />
            <Text>Xavier Lee</Text>
            <HStack>
              <Tag size="md" borderRadius="full">
                <FaSchool />
                <TagLabel ml={1}>NUS</TagLabel>
              </Tag>
              <Tag size="md" borderRadius="full">
                <IoIosSchool />
                <TagLabel ml={1}>Y3 Data Science</TagLabel>
              </Tag>
            </HStack>
          </Wrap>
          <Wrap spacing={{ base: 2, md: 4 }}>
            <Avatar name="Evelyn Tan" size="sm" />
            <Text>Evelyn Tan</Text>
            <HStack>
              <Tag size="md" borderRadius="full">
                <FaSchool />
                <TagLabel ml={1}>NTU</TagLabel>
              </Tag>
              <Tag size="md" borderRadius="full">
                <IoIosSchool />
                <TagLabel ml={1}>Y2 Business</TagLabel>
              </Tag>
            </HStack>
          </Wrap>
        </Stack>
        <Divider />
        <Stack my={4} spacing={2}>
          <Text fontWeight="medium">We're strong in</Text>
          <Wrap spacing={2}>
            <Tag
              size="md"
              borderRadius="full"
              bgColor={useColorModeValue("red.50", "red.700")}
            >
              <TagLabel>Data visualisation</TagLabel>
            </Tag>
            <Tag
              size="md"
              borderRadius="full"
              bgColor={useColorModeValue("red.50", "red.700")}
            >
              <TagLabel>Machine learning</TagLabel>
            </Tag>
            <Tag
              size="md"
              borderRadius="full"
              bgColor={useColorModeValue("red.50", "red.700")}
            >
              <TagLabel>Presentation Skills</TagLabel>
            </Tag>
          </Wrap>
        </Stack>
        <Divider />
        <Stack mt={4} spacing={2}>
          <Text fontWeight="medium">We're looking for</Text>
          <Box>
            <Tag
              size="md"
              borderRadius="full"
              bgColor={useColorModeValue("blue.50", "blue.700")}
            >
              <TagLabel>UI/UX design</TagLabel>
            </Tag>
          </Box>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default SkeletonGroup;