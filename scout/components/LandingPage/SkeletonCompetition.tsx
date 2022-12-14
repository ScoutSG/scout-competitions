import {
  Flex,
  Stack,
  useColorModeValue,
  Text,
  Wrap,
  Tag,
  TagLeftIcon,
  TagLabel,
  HStack,
  Divider,
  Box,
  Icon,
} from "@chakra-ui/react";

import moment from "moment";
import { AiFillTrophy, AiTwotoneCalendar } from "react-icons/ai";
import { MdTimer } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { VscOctoface } from "react-icons/vsc";

const SkeletonCompetition: React.FC = () => {
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.500", "gray.300");
  const secondaryBgColor = useColorModeValue("gray.100", "gray.600");

  return (
    <Flex
      pl={{ base: 0, sm: 8, md: 16 }}
      pt={{base: 16, xl: 24}}
      width={{ base: "lg", md: "xl" }}
    >
      <Stack
        width="100%"
        height="max-content"
        bgColor={bgColor}
        boxShadow="lg"
        rounded="2xl"
        p={8}
        spacing={4}
      >
        <Text fontSize="xl" fontWeight="semibold">
          Really Cool Hackathon 😎
        </Text>
        <Wrap spacing={4}>
          <Tag>
            <TagLeftIcon as={RiTeamLine} color={textColor} />
            <TagLabel fontSize="md" textColor={textColor}>
              3-4
            </TagLabel>
          </Tag>
          <Tag>
            <TagLeftIcon as={AiTwotoneCalendar} color={textColor} />
            <TagLabel fontSize="md" textColor={textColor}>
              {moment(new Date(Date.now() + 86400000 * 7)).format("DD MMM")}
            </TagLabel>
          </Tag>
          <Tag>
            <TagLeftIcon as={MdTimer} color={textColor} />
            <TagLabel fontSize="md" textColor={textColor}>
              7 days left
            </TagLabel>
          </Tag>
        </Wrap>
        <Wrap spacing={4}>
          <Tag colorScheme="cyan" fontSize="md" textColor={textColor}>
            <TagLeftIcon as={VscOctoface} />
            <TagLabel>Dream Company Inc.</TagLabel>
          </Tag>
          <HStack spacing={1.5}>
            <Text fontWeight="semibold">20</Text>
            <Text>groups participating</Text>
          </HStack>
        </Wrap>
        <Divider />
        <Stack spacing={2}>
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
        </Stack>
        <Divider />
        <HStack>
          <Icon as={AiFillTrophy} />
          <Text fontWeight="medium">Prizes</Text>
        </HStack>
        <HStack spacing={1.5}>
          <Text fontWeight="medium">🥇 First place:</Text>
          <Text> SGD 10,000</Text>
        </HStack>
      </Stack>
    </Flex>
  );
};

export default SkeletonCompetition;
