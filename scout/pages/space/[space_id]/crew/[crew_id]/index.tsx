import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  List,
  ListItem,
  Progress,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbCheck,
  TbLink,
  TbSend,
  TbX,
} from "react-icons/tb";
import { useRouter } from "next/router";
import { Group } from "../../../../../frontend/types/Group";
import Link from "next/link";

const group: Group = {
  id: 123,
  name: "Fresh Remix",
  size: 1,
  targetSize: 4,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  targetSkills: ["react", "next", "typescript"],
  members: [
    {
      name: "John Doe",
      year: 3,
      major: "Computer Science",
      specialisation: "Database Systems",
      profileUrl: ["https://www.github.com", "https://www.linkedin.com"],
    },
  ],
  hasApplied: false,
  isLeader: true,
  applications: [
    {
      applicant: {
        name: "Didymus",
        year: 3,
        major: "Computer Science",
        specialisation: "AI",
        profileUrl: ["https://www.github.com", "https://www.linkedin.com"],
      },
      answers: [
        {
          question: "how are you",
          answer: 3,
        },
        {
          question:
            "how are you at react typescript javascript next prisma pokemon go taking over the world",
          answer: 5,
        },
      ],
      isApproved: false,
    },
    {
      applicant: {
        name: "Didymus",
        year: 3,
        major: "Computer Science",
        specialisation: "AI",
        profileUrl: ["https://www.github.com", "https://www.linkedin.com"],
      },
      answers: [
        {
          question: "how are you",
          answer: 3,
        },
        {
          question:
            "how are you at react typescript javascript next prisma pokemon go taking over the world",
          answer: 5,
        },
      ],
      isApproved: false,
    },
  ],
};

const inferLinkIcon = (url: string) => {
  if (url.includes("github")) {
    return <TbBrandGithub />;
  } else if (url.includes("linkedin")) {
    return <TbBrandLinkedin />;
  } else {
    return <TbLink />;
  }
};

function Applications({
  applications,
}: {
  applications: Group["applications"];
}) {
  if (applications === null) return null;

  return (
    <Box>
      <Heading as="h2" size="lg">
        Applications
      </Heading>
      <Accordion allowMultiple>
        {applications
          .filter(({ isApproved }) => !isApproved)
          .map(({ applicant, answers }, index) => (
            <AccordionItem key={index}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton>
                      <Flex
                        flex="1"
                        textAlign="left"
                        gap="1"
                        alignItems="center"
                      >
                        <Text>{applicant.name}</Text>
                        <Badge>Year {applicant.year}</Badge>
                        <Badge>{applicant.major}</Badge>
                        <Badge>{applicant.specialisation}</Badge>
                      </Flex>
                      <Flex gap={2} alignItems="center">
                        {/* TODO: FIX REACT HYDRATION ERROR */}
                        {/* <IconButton
                          aria-label="reject"
                          colorScheme="red"
                          size="sm"
                          icon={<TbX />}
                          visibility={isExpanded ? "hidden" : null}
                          onClick={(event) => event.stopPropagation()}
                        />
                        <IconButton
                          aria-label="approve"
                          colorScheme="green"
                          size="sm"
                          icon={<TbCheck />}
                          visibility={isExpanded ? "hidden" : null}
                          onClick={(event) => event.stopPropagation()}
                        /> */}
                        <Spacer />
                        <AccordionIcon />
                      </Flex>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <List spacing={3}>
                      {applicant.profileUrl.map((url) => (
                        <ListItem>
                          <Button
                            as="a"
                            href={url}
                            target="_blank"
                            variant="link"
                            leftIcon={inferLinkIcon(url)}
                          >
                            {url}
                          </Button>
                        </ListItem>
                      ))}
                      {answers.map(({ question, answer }) => (
                        <ListItem display="flex" flexDirection="column">
                          <Text>{question}</Text>
                          <Flex alignItems="center" gap={5}>
                            <Progress value={(answer / 5) * 100} flex="1" />
                            <Text>{answer}/5</Text>
                          </Flex>
                        </ListItem>
                      ))}
                      <ButtonGroup
                        display="flex"
                        justifyContent="flex-end"
                        gap={2}
                      >
                        <Button colorScheme="red" leftIcon={<TbX />}>
                          Reject
                        </Button>
                        <Button colorScheme="green" leftIcon={<TbCheck />}>
                          Approve
                        </Button>
                      </ButtonGroup>
                    </List>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
      </Accordion>
    </Box>
  );
}

export default function Crew() {
  const router = useRouter();
  const { space_id, crew_id } = router.query;
  return (
    <Stack maxWidth={720}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h1" size="xl">
          {group.name}
        </Heading>
        <Badge>Leader</Badge>
      </Flex>
      <Text>{group.description}</Text>
      <Link
        href={{
          pathname: `${router.pathname}/apply`,
          query: { space_id, crew_id },
        }}
      >
        <Button colorScheme="green" rightIcon={<TbSend />}>
          Apply
        </Button>
      </Link>
      <Applications applications={group.applications} />
    </Stack>
  );
}
