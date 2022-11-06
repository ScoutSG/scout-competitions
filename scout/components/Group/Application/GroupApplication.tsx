import { useEffect, useState } from "react";
import { Stack, Heading, List, Button } from "@chakra-ui/react";
import { TbSend } from "react-icons/tb";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Form, Question, QuestionType } from "../../../core/types/Group";
import clientApi from "../../../core/api/client";
import { useCustomToast } from "../../../lib/hooks/useCustomToast";
import { useDraftRequest } from "../../../lib/hooks/useDraftRequest";
import { useDraftTelegram } from "../../../lib/hooks/useDraftGroup";
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

const TELEGRAM_HELPER_TEXT =
  "The group you're requesting to join has a Telegram group. For a smoother user experience, please indicate your Telegram username so that you can be added to the group upon approval! Please also add @scoutsg as a contact on Telegram.";

const DUMMY_TELEGRAM_QUESTION: Question = {
  id: -1,
  questionString: "Telegram username",
  questionType: QuestionType.OpenEnded,
};

const Application = ({ form }: { form: Form }) => {
  const router = useRouter();
  const session = useSession();
  const { presentToast } = useCustomToast();
  const { setDraftRequest } = useDraftRequest();
  const { setTelegramUrlDraft } = useDraftTelegram();

  const [telegramUsername, setTelegramUsername] = useState("");
  const [shouldAskForTelegram, setShouldAskForTelegram] = useState(false);
  useEffect(() => {
    (async () => {
      const [profileHasTelegram, groupHasTelegram] = await Promise.all([
        clientApi
          .get("/profile")
          .then(({ data }) => !!data.telegramUrl)
          .catch(() => false),
        clientApi
          .get(`/groups/${form.groupId}`)
          .then(({ data }) => !!data.telegramLink),
      ]);

      if (groupHasTelegram && !profileHasTelegram) {
        setShouldAskForTelegram(true);
      }
    })();
  }, [form.groupId]);

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
      if (telegramUsername) {
        const cleanTelegramUsername = telegramUsername.startsWith("@")
          ? telegramUsername.substring(1)
          : telegramUsername;
        await clientApi.patch("/profile", {
          telegramUrl: cleanTelegramUsername,
        });
      }
      const body: RequestBody = {
        ...applicationInfo,
        userId: session.data.user.id,
      };
      try {
        await clientApi.post("/applications", body);
        presentToast({
          description: "Request sent!",
          status: "success",
        });
        router.push("/requests");
      } catch (err) {
        presentToast({
          title: "Failed to submit your request",
          status: "error",
          description: err?.response?.data?.message || "",
        });
      }
    } else {
      setDraftRequest(applicationInfo);
      if (telegramUsername) {
        const cleanTelegramUsername = telegramUsername.startsWith("@")
          ? telegramUsername.substring(1)
          : telegramUsername;
        setTelegramUrlDraft({ telegramUrl: cleanTelegramUsername });
      }
      router.push("/auth/signin");
      presentToast({
        title: "Almost there! Login to submit your request to join.",
        description: "Don't worry, your answers will be saved.",
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
        {shouldAskForTelegram ? (
          <OpenEndedQuestion
            question={DUMMY_TELEGRAM_QUESTION}
            setAnswer={setTelegramUsername}
            explanation={TELEGRAM_HELPER_TEXT}
          />
        ) : null}
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
