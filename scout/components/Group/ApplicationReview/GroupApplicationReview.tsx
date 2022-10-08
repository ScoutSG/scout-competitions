import React from "react";

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
  Text,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbCheck,
  TbLink,
  TbX,
} from "react-icons/tb";

import { Group } from "../../../core/types/Group";

const inferLinkIcon = (url: string) => {
  if (url.includes("github")) {
    return <TbBrandGithub />;
  } else if (url.includes("linkedin")) {
    return <TbBrandLinkedin />;
  } else {
    return <TbLink />;
  }
};

const ApplicationReview: React.FC<{
  applications: Group["applications"];
}> = ({ applications }) => {
  return (
    <Stack spacing={4} w={"100%"}>
      <Heading size="xl">Review Requests</Heading>
      <Stack spacing={4}>
        <Text>
          {applications === null
            ? "No requeusts to review"
            : "The following have submitted a request to join"}
        </Text>
      </Stack>
      <Accordion allowMultiple>
        {applications
          .filter(({ isApproved }) => !isApproved)
          .map(({ applicant, answers }, index) => (
            <AccordionItem key={index}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton>
                      <Flex flex="1" gap="1">
                        <Stack
                          direction={{ base: "column", sm: "row" }}
                          spacing={2}
                          align={{ base: "left", sm: "center" }}
                          textAlign="left"
                        >
                          <Text>{applicant.name}</Text>
                          <Badge>Year {applicant.year}</Badge>
                          <Badge>{applicant.major}</Badge>
                          <Badge>{applicant.specialisation}</Badge>
                        </Stack>
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
                            <Progress
                              value={(answer / 5) * 100}
                              flex="1"
                              bgColor="gray.200"
                              borderRadius="10px"
                              colorScheme="primary"
                            />
                            <Text>{answer}/5</Text>
                          </Flex>
                        </ListItem>
                      ))}
                      <ButtonGroup
                        display="flex"
                        justifyContent="flex-end"
                        gap={2}
                      >
                        <Button
                          bgColor="red.400"
                          color="white"
                          colorScheme="red"
                          leftIcon={<TbX />}
                        >
                          Reject
                        </Button>
                        <Button
                          bgColor="green.400"
                          color="white"
                          colorScheme="green"
                          leftIcon={<TbCheck />}
                        >
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
      )
    </Stack>
  );
};

export default ApplicationReview;
