import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { AiTwotoneCalendar, AiFillTrophy } from "react-icons/ai";
import { RiTeamLine } from "react-icons/ri";
import { VscOctoface } from "react-icons/vsc";
import { CompetitionData } from "../../core/types/CompetitionDetail";
import { daysLeft } from "../../core/utils/date";

const CompetitionDetailsTab = ({
  competition,
}: {
  competition: CompetitionData;
}) => {
  const daysToDeadline = daysLeft(competition.deadline);
  const bgColor = useColorModeValue("gray.50", "gray.700");

  return (
    <Flex
      align="flex-start"
      flexDirection={{ base: "column-reverse", xl: "row" }}
      gap={{ base: 4, xl: 8 }}
    >
      <Stack width={{ base: "100%", xl: "60%" }} pr={8}>
        <Text fontSize="xl" fontWeight="semibold">
          About
        </Text>
        <Text whiteSpace="pre-line">{competition.description}</Text>
      </Stack>
      <Flex
        width={{ base: "100%", xl: "40%" }}
        rounded="xl"
        bgColor={{ base: "none", xl: bgColor }}
        p={{ base: 0, xl: 8 }}
        flexDirection="column"
        gap={4}
      >
        <Text
          fontSize="xl"
          fontWeight="semibold"
          display={{ base: "flex", xl: "none" }}
        >
          Details
        </Text>
        <Stack spacing={8}>
          <Stack>
            <HStack>
              <Icon as={VscOctoface} />
              <Text>Organised by:</Text>
            </HStack>
            <Text fontWeight="medium">{competition.organiserName}</Text>
          </Stack>
          <Stack>
            <HStack>
              <Icon as={RiTeamLine} />
              <Text>Team size:</Text>
            </HStack>
            <Text fontWeight="medium">
              {competition.minSize === competition.maxSize
                ? `${competition.minSize}\u00A0 members`
                : `${competition.minSize} - ${competition.maxSize}\u00A0 members`}
            </Text>
          </Stack>
          <Stack>
            <HStack>
              <Icon as={AiTwotoneCalendar} />
              <Text>Deadline</Text>
            </HStack>
            <HStack spacing={4}>
              <Text fontWeight="medium">
                {moment(competition.deadline).format("DD MMM YYYY")}
              </Text>
              <Badge
                colorScheme={
                  daysToDeadline <= 7
                    ? "red"
                    : daysToDeadline <= 30
                    ? "orange"
                    : "green"
                }
              >
                {daysToDeadline + " days left"}
              </Badge>
            </HStack>
          </Stack>
          <Stack>
            <HStack>
              <Icon as={AiFillTrophy} />
              <Text>Prizes</Text>
            </HStack>
            {competition.firstPrize && (
              <HStack alignItems="flex-start">
                <Text fontWeight="medium" minWidth="fit-content">
                  🥇 First place:
                </Text>
                <Text>{competition.firstPrize}</Text>
              </HStack>
            )}
            {competition.secondPrize && (
              <HStack alignItems="flex-start">
                <Text fontWeight="medium" minWidth="fit-content">
                  🥈 Second place:
                </Text>
                <Text>{competition.secondPrize}</Text>
              </HStack>
            )}
            {competition.thirdPrize && (
              <HStack alignItems="flex-start">
                <Text fontWeight="medium" minWidth="fit-content">
                  🥉 Third place:
                </Text>
                <Text>{competition.thirdPrize}</Text>
              </HStack>
            )}
            {competition.otherPrizes && (
              <HStack alignItems="flex-start">
                <Text fontWeight="medium" minWidth="fit-content">
                  🎁 Other prizes:
                </Text>
                <Text>{competition.otherPrizes}</Text>
              </HStack>
            )}
          </Stack>
        </Stack>
        <Divider mt={4} display={{ base: "flex", xl: "none" }} />
      </Flex>
    </Flex>
  );
};

export default CompetitionDetailsTab;
