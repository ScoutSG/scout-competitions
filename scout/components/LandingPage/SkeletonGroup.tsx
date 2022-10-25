import {
  Avatar,
  Box,
  Divider,
  Flex,
  HStack,
  Spacer,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
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
    <Flex
      width={{ base: "lg", md: "xl" }}
      pt={16}
      justifyContent="right"
      pr={{ base: 0, sm: 8, md: 16 }}
    >
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
        </Wrap>
        <Stack py={2} spacing={2}>
          <Text fontWeight="medium">Description</Text>
          <Box
            width="100%"
            height="20px"
            bgColor={secondaryBgColor}
            rounded="md"
          />
          <Box
            width="100%"
            height="20px"
            bgColor={secondaryBgColor}
            rounded="md"
          />
          <Text>We want 🫵</Text>
        </Stack>
        <Divider />
        <Stack py={2} spacing={2}>
          <Text fontWeight="medium">Members (2/3)</Text>
          <Wrap spacing={{ base: 2, md: 4 }} align="center">
            <Avatar name="Xavier Lee" size="sm" />
            <Box width="100px" height="20px" rounded="md" bgColor={secondaryBgColor} />
            <HStack>
              <Tag size="md" borderRadius="full">
                <TagLeftIcon as={FaSchool} />
                <TagLabel ml={1}>NUS</TagLabel>
              </Tag>
              <Tag size="md" borderRadius="full">
                <TagLeftIcon as={IoIosSchool} />
                <TagLabel ml={1}>Y3 DSA</TagLabel>
              </Tag>
            </HStack>
          </Wrap>
          <Wrap spacing={{ base: 2, md: 4 }} align="center">
            <Avatar name="Evelyn Goh" size="sm" />
            <Box width="100px" height="20px" rounded="md" bgColor={secondaryBgColor} />
            <HStack>
              <Tag size="md" borderRadius="full">
                <TagLeftIcon as={FaSchool} />
                <TagLabel>NTU</TagLabel>
              </Tag>
              <Tag size="md" borderRadius="full">
                <TagLeftIcon as={IoIosSchool} />
                <TagLabel ml={1}>Y2 Business</TagLabel>
              </Tag>
            </HStack>
          </Wrap>
        </Stack>
        <Divider />
        <Stack pt={2} spacing={2}>
          <Text fontWeight="medium">We're strong in</Text>
          <Wrap spacing={2}>
            <Tag rounded="xl" bgColor={useColorModeValue("red.50", "red.700")}>
              <TagLabel>Data visualisation</TagLabel>
            </Tag>
            <Tag rounded="xl" bgColor={useColorModeValue("red.50", "red.700")}>
              <TagLabel>Machine learning</TagLabel>
            </Tag>
            <Tag rounded="xl" bgColor={useColorModeValue("red.50", "red.700")}>
              <TagLabel>Presentation Skills</TagLabel>
            </Tag>
          </Wrap>
        </Stack>
        <Stack pt={2} spacing={2}>
          <Text fontWeight="medium">We're looking for</Text>
          <Box>
            <Tag
              rounded="xl"
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
