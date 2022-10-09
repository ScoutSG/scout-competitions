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

interface Answer {
  answerVal: number;
  questionString: string;
}

const ApplicationPreviewUnit = ({
  applications,
}: {
  applications: {
    competitionName: string;
    groupName: string;
    isApproved: boolean;
    answers: Answer[];
  }[];
}) => {
  console.log(applications);
  // applications = [
  //   {
  //     competitionName: "OGP",
  //     groupName: "Test",
  //     isApproved: true,
  //     answers: [
  //       {
  //         answerVal: 1,
  //         questionString: "How are you?",
  //       },
  //       {
  //         answerVal: 3,
  //         questionString: "How is today",
  //       },
  //     ],
  //   },
  //   {
  //     competitionName: "OGP",
  //     groupName: "Test",
  //     isApproved: false,
  //     answers: [
  //       {
  //         answerVal: 1,
  //         questionString: "How are you?",
  //       },
  //       {
  //         answerVal: 3,
  //         questionString: "How is today",
  //       },
  //     ],
  //   },
  // ];

  const approvedApplications = applications.filter(
    (application) => application.isApproved
  );
  const rejectedApplications = applications.filter(
    (application) => !application.isApproved
  );
  return (
    <>
      <Spacer />
      <Spacer />
      <Text fontWeight="550">Approved</Text>
      <Accordion allowMultiple>
        {approvedApplications.map(
          ({ competitionName, groupName, answers }, index) => (
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
                          <Badge fontWeight="550">{competitionName}</Badge>
                          <Badge fontWeight="550">{groupName}</Badge>
                        </Stack>
                      </Flex>
                      <Flex gap={2} alignItems="center">
                        <Button size="sm">View group</Button>
                        <Spacer />
                        <AccordionIcon />
                      </Flex>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <List spacing={3}>
                      {answers.map(({ questionString, answerVal }) => (
                        <ListItem display="flex" flexDirection="column">
                          <Text>{questionString}</Text>
                          <Flex alignItems="center" gap={5}>
                            <Progress
                              value={(answerVal / 5) * 100}
                              flex="1"
                              bgColor="gray.200"
                              borderRadius="10px"
                              colorScheme="primary"
                            />
                            <Text>{answerVal}/5</Text>
                          </Flex>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          )
        )}
      </Accordion>
      {rejectedApplications.length === 0 ? null : (
        <>
          {" "}
          <Text fontWeight="550">Rejected</Text>
          <Accordion allowMultiple>
            {rejectedApplications.map(
              ({ competitionName, groupName, answers }, index) => (
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
                              <Badge fontWeight="550">{competitionName}</Badge>
                              <Badge fontWeight="550">{groupName}</Badge>
                            </Stack>
                          </Flex>
                          <Flex gap={2} alignItems="center">
                            <Spacer />
                            <AccordionIcon />
                          </Flex>
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <List spacing={3}>
                          {answers.map(({ questionString, answerVal }) => (
                            <ListItem display="flex" flexDirection="column">
                              <Text>{questionString}</Text>
                              <Flex alignItems="center" gap={5}>
                                <Progress
                                  value={(answerVal / 5) * 100}
                                  flex="1"
                                  bgColor="gray.200"
                                  borderRadius="10px"
                                  colorScheme="primary"
                                />
                                <Text>{answerVal}/5</Text>
                              </Flex>
                            </ListItem>
                          ))}
                        </List>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              )
            )}
          </Accordion>
        </>
      )}
    </>
  );
};

export default ApplicationPreviewUnit;
