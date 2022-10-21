import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Link from "next/link";
import { CompetitionData } from "../../core/types/CompetitionDetail";
import PageContainer from "../PageContainer";
import CompetitionDetailsTab from "./CompetitionDetailsTab";
import GroupSummaryTab from "./GroupSummaryTab";

// const describeGroupSizeRestriction = (min: number, max: number) => {
//   if (min === null && max === null) {
//     return "There are no restrictions on the group size.";
//   } else if (min === null) {
//     return `Groups can only be formed with a maximum size of ${max} members`;
//   } else if (max === null) {
//     return `Groups must have a minimum size of ${min} members`;
//   } else {
//     return `Groups are restricted to ${min} - ${max} members`;
//   }
// };

const CompetitionDetails: React.FC = ({
  competition,
}: {
  competition: CompetitionData;
}) => {
  // const onSeeMore = () => {
  //   window.open(competition.link, "_blank");
  // };

  // // front end validation
  // const isMemberOfCompetition = useIsMember(
  //   (competition.groups as any[]).flatMap((group) => group.members)
  // );

  return (
    <PageContainer>
      <Stack width="100%" my={8} px={0} spacing={4}>
        <Flex justifyContent="space-between" align="flex-start" flexWrap="wrap">
          <Heading fontWeight="semibold" mr={8} mb={4}>
            {competition.name}
          </Heading>
          <Link href={competition.link} passHref>
            <a target="_blank" rel="noopener noreferrer">
              <Button
                size={{ base: "md", md: "lg" }}
                rightIcon={<ArrowForwardIcon />}
                colorScheme="teal"
                mb={4}
              >
                Visit website
              </Button>
            </a>
          </Link>
        </Flex>
        <Divider />
        <Tabs variant="soft-rounded" colorScheme="cyan">
          <TabList gap={4} mb={2}>
            <Tab rounded="lg">Competition</Tab>
            <Tab rounded="lg">Groups</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <CompetitionDetailsTab competition={competition} />
            </TabPanel>
            <TabPanel px={0}>
              <GroupSummaryTab
                competition={competition}
                groups={competition.groups}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </PageContainer>
  );
  {
    /*
    <PageContainer>
      <Box>
        <Head>
          <title>{competition.name} - Scout</title>
        </Head>
        <Center>
          <Stack
            maxW={maxWidth}
            py={5}
            px={{ base: 4, md: 10 }}
            direction={{ base: "column", md: "row" }}
          >
            <Stack direction="column" spacing={8} flex={3} px={4}>
              <Stack spacing={4}>
                <Box as={"header"} w="100%">
                  <Heading fontWeight="black">{competition.name}</Heading>
                </Box>
                <Stack direction="row" spacing={4}>
                  {competition.organiserName === "" ? null : (
                    <Badge
                      w="fit-content"
                      py={1}
                      px={2}
                      colorScheme="green"
                      textTransform="capitalize"
                    >
                      <Stack direction="row" align="center">
                        <Icon as={VscOctoface} />
                        <Text>Organised by {competition.organiserName}</Text>
                      </Stack>
                    </Badge>
                  )}
                  <Stack direction="row" align="center" color="red.400">
                    <Icon as={TbClock} />
                    <Text fontWeight="semibold">
                      Sign Up by {formatDate(competition.deadline)}
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
              <Divider borderColor="gray.500" />
              <Stack spacing={2}>
                <Heading size="md" fontWeight="black">
                  About
                </Heading>
                <Text>{competition.description}</Text>
              </Stack>
              <Stack spacing={2}>
                <Heading size="md" fontWeight="black">
                  Restrictions
                </Heading>

                <Stack direction="row" align="center" spacing={1}>
                  <UnorderedList>
                    <ListItem>
                      {describeGroupSizeRestriction(
                        competition.minSize,
                        competition.maxSize
                      )}
                    </ListItem>
                  </UnorderedList>
                </Stack>
              </Stack>
              <Divider borderColor="gray.500" />

              <Stack spacing={2}>
                <Heading size="md" fontWeight="black">
                  Participating groups
                </Heading>
                <Text>
                  {competition.groups.length} group
                  {competition.groups.length === 1 ? "" : "s"} found
                </Text>
              </Stack>
              {competition.groups.length === 0 ? (
                <>
                  <Text>No groups have been formed yet!</Text>
                  <Stack spacing={4}>
                    <Heading size="md" fontWeight="black">
                      Can't find a suitable team?
                    </Heading>
                    <Link href={`/competitions/${competition.id}/groups`}>
                      <Button
                        rightIcon={<TbChevronRight />}
                        bgColor="primary.500"
                        color="white"
                        _hover={{ bgColor: "gray.200", color: "primary.500" }}
                      >
                        Lead a team now
                      </Button>
                    </Link>
                  </Stack>
                </>
              ) : (
                (competition.groups as any[]).map((group) => (
                  <GroupSummaryCard
                    group={group}
                    isMemberOfCompetition={isMemberOfCompetition}
                  />
                ))
              )}
            </Stack>
            <Stack flex={1} px={4}>
              <Link href={`/competitions/${competition.id}/groups`}>
                <Button
                  rightIcon={<TbChevronRight />}
                  color="white"
                  bg={"primary.500"}
                  _hover={{ color: "primaryLight", bg: "gray.200" }}
                  w="full"
                  disabled={isMemberOfCompetition}
                >
                  Lead a team
                </Button>
              </Link>
              <Button
                rightIcon={<TbChevronRight />}
                onClick={onSeeMore}
                w="full"
              >
                Visit organiser website
              </Button>
            </Stack>
          </Stack>
        </Center>
      </Box>
    </PageContainer>
    */
  }
};

export default CompetitionDetails;
