import {
  FormControl,
  FormLabel,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { Question } from "../../../core/types/Group";

const labelStyles = {
  mt: "2",
  width: "10px",
  ml: "-5px",
  fontSize: "sm",
  fontWeight: "500",
};

type QuestionProps = {
  question: Question;
  setAnswer: (newAnswer: string) => void;
};

const RangeQuestion = ({ question, setAnswer }: QuestionProps) => {
  return (
    <FormControl padding={4}>
      <FormLabel>{question.questionString}</FormLabel>
      <Slider
        aria-label={question.questionString}
        min={1}
        max={5}
        defaultValue={3}
        step={1}
        onChangeEnd={(value) => setAnswer(value.toString())}
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

export default RangeQuestion;
