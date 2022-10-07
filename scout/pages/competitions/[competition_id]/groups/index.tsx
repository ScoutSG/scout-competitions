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
} from "@chakra-ui/react";
import Head from "next/head";
import { TbMinus, TbPlus, TbSend } from "react-icons/tb";
import {
  CompetitionData,
  GroupSummaryData,
} from "../../../../core/types/CompetitionDetail";
import AboutCard from "../../../../components/Competition/AboutCard";

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

const CreateGroupForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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

  const handleSubmit = () => {
    console.log({
      name,
      description,
      questions,
    });
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

const CreateGroup: React.FC = () => {
  const response: CompetitionData = {
    id: 123,
    name: "Hack For Public Good 2023",
    deadline: "12 Dec 2022",
    organiserName: "OGP, GovTech",
    description:
      "Hack for Public Good is an annual fixture of OGP's way of work to keep us identifying and working on building tech to deliver public good in its various shapes and forms.",
    urlLink: "https://www.open.gov.sg/hackathon/2023/",
    maxSize: 6,
    minSize: 1,
    groups: [modelGroup, modelGroup, modelGroup, modelGroup],
  };

  return (
    <>
      <Head>
        <title>{response.name} - Scout</title>
      </Head>
      <Stack
        spacing={10}
        py={{ base: 5, md: 16 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={2} spacing={{ base: 1, md: 10 }}>
          <Box as={"header"} m={1} p={{ base: 1, md: 6 }}>
            <Heading>{response.name}</Heading>
          </Box>
          <Box m={1} p={{ base: 2, md: 7 }}>
            <AboutCard data={response} hideFindATeam />
          </Box>
        </Stack>
        <Flex flex={3} justify={"center"} position={"relative"} w={"100%"}>
          <CreateGroupForm />
        </Flex>
      </Stack>
    </>
  );
};

/** TO DELETE */
const modelGroup: GroupSummaryData = {
  id: 1,
  name: "Scout",
  size: 2,
  targetSize: 6,
  description: "This is a test group ",
  targetSkills: ["React", "Next", "Spring Boot", "UX Design", "Figma"],
  leader: {
    name: "Lye Wen Jun",
    year: 3,
    major: "Computer Science",
    specialization: "Database",
  },
};

export default CreateGroup;
