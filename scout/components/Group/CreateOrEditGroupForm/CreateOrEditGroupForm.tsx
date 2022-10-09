import {
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Spacer,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { TbMinus, TbPlus, TbSend } from "react-icons/tb";
import clientApi from "../../../core/api/client";
import { CompetitionData } from "../../../core/types/CompetitionDetail";
import { Form, Group } from "../../../core/types/Group";

type QuestionProps = {
  index: number;
  value: string;
  setValue: (newValue: string) => void;
  removeQuestion: () => void;
};

const Question = ({
  index,
  value,
  setValue,
  removeQuestion,
}: QuestionProps) => {
  return (
    <InputGroup>
      <Input
        placeholder={`Question ${index + 1}`}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <InputRightElement>
        <IconButton
          aria-label="delete question"
          icon={<TbMinus />}
          variant="ghost"
          onClick={removeQuestion}
        />
      </InputRightElement>
    </InputGroup>
  );
};

type CreateOrEditGroupFormProps = {
  competition: CompetitionData;
  group?: Group;
  form?: Form;
};

const CreateOrEditGroupForm = ({
  competition,
  group,
  form,
}: CreateOrEditGroupFormProps) => {
  const session = useSession();
  const router = useRouter();
  const [name, setName] = useState(group?.name);
  const [description, setDescription] = useState(group?.description);
  const [targetSize, setTargetSize] = useState(
    group?.targetSize ?? competition.maxSize
  );
  const [questions, setQuestions] = useState(
    form?.questions.map((qn) => qn.questionString) ?? [""]
  );

  const setNthQuestion = (n: number) => (newValue: string) => {
    setQuestions((questions) =>
      questions.map((value, i) => (i === n ? newValue : value))
    );
  };

  const addQuestion = () => {
    setQuestions((questions) => questions.concat([""]));
  };

  const removeQuestion = (n: number) => {
    setQuestions((questions) => questions.filter((_, i) => i !== n));
  };

  const handleSubmit = async () => {
    // TODO: add error validation; block if name and description are empty
    const body = {
      competitionId: competition.id,
      name,
      description,
      currentSize: 1,
      targetSize,
      members: [session.data.user.id],
      targetSkills: [], // TODO: implement targetSkills
      form: {
        questions: questions
          .filter((str) => str.length > 0)
          .map((questionString) => ({ questionString })),
      },
    };

    let group_id;
    if (group === undefined) {
      const response = await clientApi.post("/groups", body);
      group_id = response.data.id;
    } else {
      const response = await clientApi.patch(`/groups/${group.id}`, body);
      group_id = response.data.id;
    }
    router.push(`/competitions/${competition.id}/groups/${group_id}`);
  };

  return (
    <Stack width="100%" spacing={5}>
      <Heading as="h2" size="lg">
        {group === undefined ? "Create a new group" : `Edit ${group.name}`}
      </Heading>
      <FormControl isRequired>
        <FormLabel>Group name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Target group size</FormLabel>
        <NumberInput
          value={targetSize}
          onChange={(value) => setTargetSize(parseInt(value))}
          min={competition.minSize}
          max={competition.maxSize}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Looking for</FormLabel>
      </FormControl>
      <Stack>
        <Heading as="h3" size="md">
          Questions for prospective group members
        </Heading>
        <Text>
          You can ask your prospective group members some questions to get to
          know their skillsets and personalities better. To keep things quick
          and easy, the questions will be close-ended, on a scale of 1 to 5.
        </Text>
        {questions.map((question, index) => (
          <Question
            key={index}
            value={question}
            setValue={setNthQuestion(index)}
            removeQuestion={() => removeQuestion(index)}
            index={index}
          />
        ))}
        <Button leftIcon={<TbPlus />} onClick={addQuestion} variant="outline">
          Add Question
        </Button>
      </Stack>
      <Spacer />
      <Button
        color="white"
        bg={"secondary"}
        _hover={{ color: "secondary", bg: "gray.50" }}
        rightIcon={<TbSend />}
        onClick={handleSubmit}
        width="fit-content"
        alignSelf="flex-end"
      >
        Submit
      </Button>
    </Stack>
  );
};

export default CreateOrEditGroupForm;
