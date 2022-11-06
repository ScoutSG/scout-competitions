import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Question } from "../../../core/types/Group";
import Explanation from "../../Explanation";

type QuestionProps = {
  question: Question;
  setAnswer: (newAnswer: string) => void;
  explanation?: string;
};

const OpenEndedQuestion = ({
  question,
  setAnswer,
  explanation,
}: QuestionProps) => {
  return (
    <FormControl padding={4}>
      <FormLabel>
        {question.questionString}
        <Explanation label={explanation} />
      </FormLabel>
      <Input onChange={(event) => setAnswer(event.target.value)} />
    </FormControl>
  );
};

export default OpenEndedQuestion;
