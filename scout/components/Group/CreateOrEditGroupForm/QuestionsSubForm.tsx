import {
  Stack,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { TbMinus, TbPlus } from "react-icons/tb";
import { CreateOrEditGroupFormValue } from "./types";

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

  return (
    <Stack>
      <Heading as="h3" size="md">
        Questions for prospective group members
      </Heading>
      <Text>
        You can ask your prospective group members some questions to get to know
        their skillsets and personalities better. To keep things quick and easy,
        the questions will be close-ended, on a scale of 1 to 5.
      </Text>
      {fields.map((item, index) => (
        <InputGroup key={item.id}>
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
      <Button
        leftIcon={<TbPlus />}
        onClick={() => append({ questionString: "" })}
        variant="outline"
      >
        Add Question
      </Button>
    </Stack>
  );
}
