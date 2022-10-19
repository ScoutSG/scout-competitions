import {
  Stack,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Button,
  Text,
  ButtonGroup,
  InputLeftAddon,
  Badge,
  Center,
  Icon,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import {
  TbAdjustmentsHorizontal,
  TbCursorText,
  TbMinus,
  TbPlus,
} from "react-icons/tb";
import { QuestionType } from "../../../core/types/Group";
import { CreateOrEditGroupFormValue } from "./types";
import { TEMPLATES } from "../../../core/utils/quetions";

const getQuestionTypeIcon = (questionType: QuestionType) => {
  switch (questionType) {
    case QuestionType.Range:
      return <TbAdjustmentsHorizontal />;
    case QuestionType.OpenEnded:
      return <TbCursorText />;
  }
};

type QuestionsSubFormProps = Pick<
  UseFormReturn<CreateOrEditGroupFormValue>,
  "control" | "register"
>;

export default function QuestionsSubForm({
  control,
  register,
}: QuestionsSubFormProps) {
  const { fields, append, remove } = useFieldArray<CreateOrEditGroupFormValue>({
    control,
    name: "questions",
  });

  const handleAddTemplateQuestions = (template) => {
    template.questions.map((question) => {
      append({
        questionString: question.question,
        questionType: question.type,
      });
    });
  };

  return (
    <Stack>
      <Heading as="h3" size="md">
        Questions for prospective group members
      </Heading>
      <Text>
        You can ask your prospective group members some questions to get to know
        their skillsets and personalities better.
      </Text>
      <Alert status="info" px={4} py={2} rounded="md" overflowX="scroll">
        <Stack>
          <AlertTitle>Tips from Google</AlertTitle>
          <AlertDescription>
            Google researchers discovered the secret of effective teams at
            Google. Here are some questions to get a more effective team!
          </AlertDescription>
          <Stack direction={"row"}>
            {TEMPLATES.map((template) => (
              <Button
                onClick={() => handleAddTemplateQuestions(template)}
                bgColor="primary.500"
                color="white"
                _hover={{ bgColor: "transparent", color: "primary.500" }}
              >
                {template.name}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Alert>

      {fields.map((item, index) => (
        <InputGroup key={item.id}>
          {"questionType" in item ? (
            <InputLeftAddon
              children={getQuestionTypeIcon(item.questionType as QuestionType)}
            />
          ) : null}
          <Input
            placeholder={`Question ${index + 1}`}
            {...register(`questions.${index}.questionString`)}
          />
          <InputRightElement>
            <IconButton
              aria-label="delete question"
              icon={<TbMinus />}
              variant="ghost"
              onClick={() => remove(index)}
            />
          </InputRightElement>
        </InputGroup>
      ))}
      <ButtonGroup isAttached variant="outline" width="100%">
        <IconButton
          aria-label="Add question"
          icon={<TbPlus />}
          variant="ghost"
          onClick={() => append({ questionString: "", questionType: "Range" })}
        />
        <Button
          width="100%"
          leftIcon={<TbAdjustmentsHorizontal />}
          onClick={() => append({ questionString: "", questionType: "Range" })}
        >
          Range Slider
        </Button>
        <Button
          width="100%"
          leftIcon={<TbCursorText />}
          onClick={() =>
            append({ questionString: "", questionType: "OpenEnded" })
          }
        >
          Open-Ended
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
