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
  import { Question } from "../../../core/types/Group";
  import { modelQuestions } from "../../../core/models/Question";
  
  const questions: Question[] = modelQuestions;
  
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
  
  const Application: React.FC = () => {
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
      <Stack spacing={5} w={"100%"}>
        <Heading as="h1" size="xl">
          Questions Required By Team
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
        >
          Submit
        </Button>
      </Stack>
    );
  };
  
  export default Application;
  