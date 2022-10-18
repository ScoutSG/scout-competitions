import {
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  SliderMark,
  List,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TbSend } from "react-icons/tb";
import { useSession } from "next-auth/react";

import { Question, QuestionsData } from "../../../core/types/Group";
import clientApi from "../../../core/api/client";
import { useCustomToast } from "../../../lib/hooks/useCustomToast";
import { useRouter } from "next/router";
import { useDraftRequest } from "../../../lib/hooks/useDraftRequest";

const labelStyles = {
  mt: "2",
  width: "10px",
  ml: "-5px",
  fontSize: "sm",
  fontWeight: "500",
};

type QuestionProps = {
  question: Question;
  setAnswer: (newAnswer: number) => void;
};

type Answer = {
  answerString: string | number;
  questionId: number;
};

interface RequestBody {
  groupId: number;
  userId: number;
  formId: number;
  answers: Answer[];
}

const Question: React.FC<QuestionProps> = ({ question, setAnswer }) => {
  return (
    <FormControl padding={4}>
      <FormLabel>{question.questionString}</FormLabel>
      <Slider
        aria-label="slider-ex-1"
        min={1}
        max={5}
        defaultValue={3}
        step={1}
        onChangeEnd={(value) => setAnswer(value)}
        colorScheme="primary"
      >
        <SliderMark value={1} {...labelStyles}>
          1
        </SliderMark>
        <SliderMark value={2} {...labelStyles}>
          2
        </SliderMark>
        <SliderMark value={3} {...labelStyles}>
          3
        </SliderMark>
        <SliderMark value={4} {...labelStyles}>
          4
        </SliderMark>
        <SliderMark value={5} {...labelStyles}>
          5
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </FormControl>
  );
};

const Application = ({ questionsData }: { questionsData: QuestionsData }) => {
  const router = useRouter();
  const session = useSession();
  const { presentToast } = useCustomToast();
  const [application, setApplication] = useState([]);
  const { setDraftRequest } = useDraftRequest();
  const questions = questionsData.questions;

  // initialise application state
  useEffect(() => {
    setApplication(questions.map((question) => ({ ...question, answer: 3 })));
  }, []);

  const setAnswer = (questionId: number) => (newAnswer: number) => {
    setApplication((currentApplication) =>
      currentApplication.map((question) =>
        question.questionId === questionId
          ? { ...question, answer: newAnswer }
          : question
      )
    );
  };

  const submitApplication = async () => {
    console.log(application)
    const applicationInfo = {
      formId: questionsData.id,
      groupId: questionsData.groupId,
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
          title: "Sent your request to the team!",
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
        title:
          "Almost there! Login to submit your request to join. Don't worry, your answers will be saved.",
        position: "top",
        status: "info",
      });
    }
  };

  return (
    <Stack spacing={5} w={"100%"}>
      <Heading as="h2" size="lg">
        Tell the team a bit about yourself!
      </Heading>
      <List spacing={5}>
        {application.map((question) => (
          <Question
            question={question}
            setAnswer={setAnswer(question.questionId)}
            key={question.questionId}
          />
        ))}
      </List>
      <Button
        color="white"
        bg={"secondary"}
        _hover={{ color: "secondary", bg: "gray.50" }}
        rightIcon={<TbSend />}
        onClick={submitApplication}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default Application;
