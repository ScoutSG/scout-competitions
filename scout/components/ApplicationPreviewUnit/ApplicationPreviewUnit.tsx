import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Flex,
  List,
  ListItem,
  Progress,
  Spacer,
  Text,
  Stack,
} from "@chakra-ui/react";

import { Group, QuestionType } from "../../core/types/Group";
import useAnalyticsTracker from "../../lib/hooks/useAnalyticsTracker";

interface Answer {
  answerResponse: number;
  question: {
    id: number;
    questionString: string;
    questionType: string;
  };
}

interface ApplicationData {
  group: Group;
  isApproved: boolean;
  answers: Answer[];
}

const ApplicationRow = ({
  relevantApplications,
  title,
}: {
  relevantApplications: ApplicationData[];
  title: string;
}) => {
  return relevantApplications.length === 0 ? null : (
    <>
      <Text fontWeight="550">{title}</Text>
      <Accordion allowMultiple>
        {relevantApplications.map(({ group, answers, isApproved }, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton>
                <Flex flex="1" gap="1">
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    spacing={2}
                    align={{ base: "left", sm: "center" }}
                    textAlign="left"
                  >
                    <Text>{group.name}</Text>
                    <Badge
                      fontWeight="550"
                      colorScheme={
                        isApproved === null
                          ? "orange"
                          : isApproved
                          ? "green"
                          : "red"
                      }
                    >
                      {isApproved === null
                        ? "Pending"
                        : isApproved
                        ? "Approved"
                        : "Rejected"}
                    </Badge>
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
                {answers.map(({ question, answerResponse }) => (
                  <ListItem display="flex" flexDirection="column">
                    <Text fontWeight="bold">{question.questionString}</Text>
                    {question.questionType === QuestionType.Range ? (
                      <Flex alignItems="center" gap={5}>
                        <Progress
                          value={(answerResponse / 5) * 100}
                          flex="1"
                          bgColor="gray.200"
                          borderRadius="10px"
                          colorScheme="primary"
                        />
                        <Text>{answerResponse}/5</Text>
                      </Flex>
                    ) : (
                      <Text>{answerResponse}</Text>
                    )}
                  </ListItem>
                ))}
              </List>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

const ApplicationPreviewUnit = ({
  applications,
}: {
  applications: ApplicationData[];
}) => {
  const eventAnalyticsTracker = useAnalyticsTracker("View Requests");

  const pendingApplications = applications.filter(
    (application) => application.isApproved === null
  );
  const approvedApplications = applications.filter(
    (application) => application.isApproved
  );
  const rejectedApplications = applications.filter(
    (application) => application.isApproved == false
  );
  return (
    <>
      <Spacer />
      <Spacer />
      <ApplicationRow
        title="Pending"
        relevantApplications={pendingApplications}
      />
      <ApplicationRow
        title="Approved"
        relevantApplications={approvedApplications}
      />
      <ApplicationRow
        title="Rejected"
        relevantApplications={rejectedApplications}
      />
    </>
  );
};

export default ApplicationPreviewUnit;
