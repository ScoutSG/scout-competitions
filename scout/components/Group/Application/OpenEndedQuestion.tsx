import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Question } from "../../../core/types/Group";

type QuestionProps = {
  question: Question;
  setAnswer: (newAnswer: string) => void;
};

const OpenEndedQuestion = ({ question, setAnswer }: QuestionProps) => {
  return (
    <FormControl padding={4}>
      <FormLabel>{question.questionString}</FormLabel>
      <Input onChange={(event) => setAnswer(event.target.value)} />
    </FormControl>
  );
};

export default OpenEndedQuestion;
