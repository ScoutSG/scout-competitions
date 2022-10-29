import React from "react";
import {
  Box,
  Text,
  Stack,
  HStack,
  Center,
  useColorModeValue,
  Tag,
  TagLeftIcon,
  TagLabel,
  Wrap,
  Divider,
  Collapse,
  Button,
  Flex,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { CompetitionDataSummary } from "../../core/types/CompetitionDetail";
import { daysLeft } from "../../core/utils/date";
import { VscOctoface } from "react-icons/vsc";
import { MdTimer } from "react-icons/md";
import { AiTwotoneCalendar } from "react-icons/ai";
import { RiTeamLine } from "react-icons/ri";
import { AiFillTrophy } from "react-icons/ai";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Linkify from "react-linkify";
import Link from "next/link";
import moment from "moment";
import useAnalyticsTracker from "../../lib/hooks/useAnalyticsTracker";

const CompetitionSummaryCard: React.FC<{
  competition: CompetitionDataSummary;
}> = ({ competition }) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = (e) => {
    e.stopPropagation();
    setShow(!show);
  };
  const textColor = useColorModeValue("gray.500", "gray.300");
  const eventAnalyticsTracker = useAnalyticsTracker("Competition Discovery");

  return (
    <Link
      href={`/competitions/${competition.id}`}
      onClick={async () => {
        await eventAnalyticsTracker("Clicked on " + competition.name);
      }}
    >
      <HStack
        width="100%"
        rounded="md"
        borderWidth="1px"
        cursor="pointer"
        role="group"
        overflow="hidden"
        spacing={0}
        _hover={{ boxShadow: "md" }}
      >
        <Box p={8}>
          <Stack spacing={4}>
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="semibold">
              {competition.name}
            </Text>
            <Wrap spacing={4}>
              <Tag>
                <TagLeftIcon as={RiTeamLine} color={textColor} />
                <TagLabel fontSize="md" textColor={textColor}>
                  {competition.minSize === competition.maxSize
                    ? competition.minSize
                    : `${competition.minSize} - ${competition.maxSize}`}
                </TagLabel>
              </Tag>
              <Tag>
                <TagLeftIcon as={AiTwotoneCalendar} color={textColor} />
                <TagLabel fontSize="md" textColor={textColor}>
                  {moment(competition.deadline).format("DD MMM")}
                </TagLabel>
              </Tag>
              <Tag>
                <TagLeftIcon as={MdTimer} color={textColor} />
                <TagLabel fontSize="md" textColor={textColor}>
                  {daysLeft(competition.deadline) + " days left"}
                </TagLabel>
              </Tag>
            </Wrap>
            <Wrap spacing={4}>
              {competition.organiserName && (
                <Tag colorScheme="cyan" fontSize="md" textColor={textColor}>
                  <TagLeftIcon as={VscOctoface} />
                  <TagLabel>{competition.organiserName}</TagLabel>
                </Tag>
              )}
              {competition.groups.length === 0 ? (
                <></>
              ) : (
                <HStack spacing={1.5}>
                  <Text fontWeight="bold">{competition.groups.length}</Text>
                  <Text>groups participating</Text>
                </HStack>
              )}
            </Wrap>
            <Divider />
            <Text fontSize="lg" fontWeight="medium">
              Description
            </Text>
            <Collapse startingHeight={72} in={show}>
              <Linkify
                componentDecorator={(decoratedHref, decoratedText, key) => (
                  <a
                    target="_blank"
                    style={{ color: "#3182ce" }}
                    href={decoratedHref}
                    key={key}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {decoratedText}
                  </a>
                )}
              >
                {competition.description.split("\\n").map((text) => (
                  <Text whiteSpace="pre-line">{text}</Text>
                ))}
              </Linkify>
            </Collapse>
            <Flex>
              <Button
                size="md"
                variant="link"
                rightIcon={
                  <ChevronDownIcon
                    transform={show ? "rotate(-180deg)" : "rotate(0deg)"}
                  />
                }
                onClick={handleToggle}
              >
                {show ? "Less" : "More"} details
              </Button>
            </Flex>
            {(competition.firstPrize || competition.otherPrizes) && (
              <>
                <Divider />
                <HStack>
                  <Icon as={AiFillTrophy} size="lg" />
                  <Text fontSize="lg" fontWeight="medium">
                    Prizes
                  </Text>
                  {competition.otherPrizes && (
                    <Badge colorScheme="green">Other prizes available</Badge>
                  )}
                </HStack>
                <Wrap spacing={4}>
                  {competition.firstPrize && (
                    <HStack spacing={1.5}>
                      <Text fontWeight="medium">🥇 First place:</Text>
                      <Text>{competition.firstPrize}</Text>
                    </HStack>
                  )}
                  {competition.secondPrize && (
                    <HStack spacing={1.5}>
                      <Text fontWeight="medium">🥈 Second place:</Text>
                      <Text>{competition.secondPrize}</Text>
                    </HStack>
                  )}
                  {competition.thirdPrize && (
                    <HStack spacing={1.5}>
                      <Text fontWeight="medium">🥉 Third place:</Text>
                      <Text>{competition.thirdPrize}</Text>
                    </HStack>
                  )}
                </Wrap>
              </>
            )}
          </Stack>
        </Box>
        <Center
          height="100%"
          px={1}
          transform="translateX(24px)"
          position="relative"
          bgColor="teal"
          _groupHover={{ transition: ".3s ease", transform: "translateX(0px)" }}
        >
          <ChevronRightIcon w={4} h={4} color="white" />
        </Center>
      </HStack>
    </Link>
  );
};

export default CompetitionSummaryCard;
