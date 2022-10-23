import React, { useState } from "react";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
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
  TbBrandTelegram,
  TbCheck,
  TbX,
} from "react-icons/tb";

import clientApi from "../../../core/api/client";
import { Group, QuestionType } from "../../../core/types/Group";
import { useCustomToast } from "../../../lib/hooks/useCustomToast";

const ApplicationReview: React.FC<{
  applications: Group["applications"];
}> = ({ applications }) => {
  // only display applications with no decision made
  const [applicationsToDisplay, setApplicationsToDisplay] = useState(
    applications.filter((application) => application.isApproved === null)
  );

  const { presentToast } = useCustomToast();

  const approveRequest = async (applicationId) => {
    const body = {
      isApproved: true,
    };

    await clientApi
      .patch(`/applications/${applicationId}`, body)
      .then(async (res) => {
        setApplicationsToDisplay(
          applicationsToDisplay.filter(
            (application) => application.id != applicationId
          )
        );
        presentToast({
          title: "Approval was successful!",
          status: "success",
          position: "top",
        });
        if (res.data.warningMessage) {
          presentToast({
            title: res.data.warningMessage,
            status: "warning",
            position: "top",
          });
        }
        return res;
      })
      .catch((err) =>
        presentToast({
          title: "Approval failed!",
          description: "Please try again later",
          status: "error",
          position: "top",
        })
      );
  };

  const rejectRequest = async (applicationId) => {
    const body = {
      isApproved: false,
    };

    await clientApi
      .patch(`/applications/${applicationId}`, body)
      .then((res) => {
        setApplicationsToDisplay(
          applicationsToDisplay.filter(
            (application) => application.id != applicationId
          )
        );
        presentToast({
          title: "Rejection was successful!",
          status: "success",
          position: "top",
        });
        return res;
      })
      .catch((err) => {
        presentToast({
          title: "Rejection failed!",
          description: "Please try again later",
          status: "error",
          position: "top",
        });
      });
  };

  return (
    <Stack spacing={4} w={"100%"}>
      <Heading size="md" fontWeight="black">
        Review Requests
      </Heading>
      <Stack spacing={4}>
        <Text>
          {applicationsToDisplay.length === 0
            ? "There are no applications to review."
            : "The following users have submitted a request to join"}
        </Text>
      </Stack>
      <Accordion allowMultiple>
        {applicationsToDisplay.map(({ applicant, answers, id }, index) => (
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
                        <Badge>
                          {!applicant.yearOfStudy
                            ? ""
                            : "Year " + applicant.yearOfStudy}
                        </Badge>
                        <Badge>{!applicant.major ? "" : applicant.major}</Badge>
                        <Badge>
                          {!applicant.specialisation
                            ? ""
                            : applicant.specialisation}
                        </Badge>
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
                    {!applicant.telegramUrl ? null : (
                      <ListItem>
                        <Button
                          as="a"
                          href={`https://www.t.me/${applicant.telegramUrl}`}
                          target="_blank"
                          leftIcon={<TbBrandTelegram />}
                          variant="outline"
                          colorScheme="telegram"
                        >
                          Telegram
                        </Button>
                      </ListItem>
                    )}
                    {!applicant.linkedinUrl ? null : (
                      <ListItem>
                        <Button
                          as="a"
                          href={applicant.linkedinUrl}
                          target="_blank"
                          leftIcon={<TbBrandLinkedin />}
                          variant="outline"
                          colorScheme="linkedin"
                        >
                          {applicant.linkedinUrl}
                        </Button>
                      </ListItem>
                    )}
                    {!applicant.gitHubUrl ? null : (
                      <ListItem>
                        <Button
                          as="a"
                          href={applicant.gitHubUrl}
                          target="_blank"
                          leftIcon={<TbBrandGithub />}
                          variant="outline"
                        >
                          {applicant.gitHubUrl}
                        </Button>
                      </ListItem>
                    )}

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
                        onClick={() => rejectRequest(id)}
                      >
                        Reject
                      </Button>
                      <Button
                        bgColor="green.400"
                        color="white"
                        colorScheme="green"
                        leftIcon={<TbCheck />}
                        onClick={() => approveRequest(id)}
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
