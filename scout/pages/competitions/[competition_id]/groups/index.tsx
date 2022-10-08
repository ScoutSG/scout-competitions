import React, { useState } from "react";
import {
  Heading,
  Box,
  Stack,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
  Spacer,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import Head from "next/head";
import { TbMinus, TbPlus, TbSend } from "react-icons/tb";
import { CompetitionData } from "../../../../core/types/CompetitionDetail";
import AboutCard from "../../../../components/Competition/AboutCard";
import clientApi from "../../../../core/api/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

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

type CreateGroupFormProps = {
  competition: CompetitionData;
};

const CreateGroupForm = ({ competition }: CreateGroupFormProps) => {
  const session = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [targetSize, setTargetSize] = useState(competition.maxSize);
  const [questions, setQuestions] = useState([""]);

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

    const response = await clientApi.post("/groups", body);
    router.push(`/competitions/${competition.id}/groups/${response.data.id}`);
  };

  return (
    <Stack width="100%" spacing={5}>
      <Heading as="h2" size="lg">
        Create a new group
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

export async function getServerSideProps(context) {
  const competition_id = context.params.competition_id;
  const response = await clientApi.get(`/competitions/${competition_id}`);
  const competition = response.data;
  return { props: { competition } };
}

type CreateGroupProps = {
  competition: CompetitionData;
};

const CreateGroup = ({ competition }: CreateGroupProps) => {
  return (
    <>
      <Head>
        <title>{competition.name} - Scout</title>
      </Head>
      <Stack
        spacing={10}
        py={{ base: 5, md: 16 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={2} spacing={{ base: 1, md: 10 }}>
          <Box as={"header"} m={1} p={{ base: 1, md: 6 }}>
            <Heading>{competition.name}</Heading>
          </Box>
          <Box m={1} p={{ base: 2, md: 7 }}>
            <AboutCard data={competition} hideFindATeam />
          </Box>
        </Stack>
        <Flex flex={3} justify={"center"} position={"relative"} w={"100%"}>
          <CreateGroupForm competition={competition} />
        </Flex>
      </Stack>
    </>
  );
};

export default CreateGroup;
