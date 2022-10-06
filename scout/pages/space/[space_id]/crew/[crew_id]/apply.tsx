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
import { Question } from "../../../../../frontend/types/Group";

const questions: Question[] = [
  {
    questionId: 123,
    questionString: "how are you",
  },
  {
    questionId: 5,
    questionString:
      "how are you at react typescript javascript next prisma pokemon go taking over the world",
  },
];

const labelStyles = {
  mt: "2",
  width: "10px",
  ml: "-5px",
  fontSize: "sm",
};

type QuestionProps = {
  question: Question;
  setAnswer: (newAnswer: number) => void;
};

function Question({ question, setAnswer }) {
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
}

export default function Apply() {
  const [application, setApplication] = useState([]);

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

  return (
    <Stack>
      <Heading as="h1" size="xl">
        Apply
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
      <Button colorScheme="green" rightIcon={<TbSend />}>
        Submit
      </Button>
    </Stack>
  );
}
