import { Stack, Heading, List, Button } from "@chakra-ui/react";
import { useState } from "react";
import { TbSend } from "react-icons/tb";
import { useSession } from "next-auth/react";

import { Form, QuestionType } from "../../../core/types/Group";
import clientApi from "../../../core/api/client";
import { useCustomToast } from "../../../lib/hooks/useCustomToast";
import { useRouter } from "next/router";
import { useDraftRequest } from "../../../lib/hooks/useDraftRequest";
import RangeQuestion from "./RangeQuestion";
import OpenEndedQuestion from "./OpenEndedQuestion";

type Answer = {
  answerString: string;
  questionId: number;
};

interface RequestBody {
  groupId: number;
  userId: number;
  formId: number;
  answers: Answer[];
}

const Application = ({ form }: { form: Form }) => {
  const router = useRouter();
  const session = useSession();
  const { presentToast } = useCustomToast();
  const { setDraftRequest } = useDraftRequest();

  const [application, setApplication] = useState(
    form.questions.map((question) => {
      if (question.questionType === QuestionType.Range) {
        return { ...question, answer: "3" };
      } else {
        return { ...question, answer: "" };
      }
    })
  );

  const setAnswer = (questionId: number) => (newAnswer: string) => {
    setApplication((currentApplication) =>
      currentApplication.map((question) =>
        question.id === questionId
          ? { ...question, answer: newAnswer }
          : question
      )
    );
  };

  const submitApplication = async () => {
    const applicationInfo = {
      formId: form.id,
      groupId: form.groupId,
      answers: application.map((app) => ({
        answerString: app.answer,
        questionId: app.id,
      })),
    };
    if (session.status === "authenticated") {
      const body: RequestBody = {
        ...applicationInfo,
        userId: session.data.user.id,
      };
      try {
        await clientApi.post("/applications", body);
        presentToast({
          description: "Request sent!",
          status: "success",
          position: "top",
        });
      } catch (err) {
        presentToast({
          title: "Failed to submit your request",
          position: "top",
          status: "error",
          description: err.response.statusText,
        });
      }
    } else {
      setDraftRequest(applicationInfo);
      router.push("/auth/signin");
      presentToast({
        title: "Almost there! Login to submit your request to join.",
        description: "Don't worry, your answers will be saved.",
        position: "top",
        status: "info",
      });
    }
  };

  return (
    <Stack spacing={5} w={"100%"}>
      <Heading as="h2" size="lg">
        {form.questions.length === 0
          ? null
          : "Tell the team a bit about yourself!"}
      </Heading>
      <List spacing={5}>
        {application.map((question) => {
          if (question.questionType === QuestionType.Range) {
            return (
              <RangeQuestion
                key={question.id}
                question={question}
                setAnswer={setAnswer(question.id)}
              />
            );
          } else {
            return (
              <OpenEndedQuestion
                key={question.id}
                question={question}
                setAnswer={setAnswer(question.id)}
              />
            );
          }
        })}
      </List>
      <Button
        color="white"
        bg={"secondary"}
        _hover={{ color: "secondary", bg: "gray.50" }}
        rightIcon={<TbSend />}
        onClick={submitApplication}
      >
        {form.questions.length === 0 ? "Confirm Request" : "Submit"}
      </Button>
    </Stack>
  );
};

export default Application;
