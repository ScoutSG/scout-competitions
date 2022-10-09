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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import { TbMinus, TbPlus, TbSend } from "react-icons/tb";
import clientApi from "../../../core/api/client";
import { CompetitionData } from "../../../core/types/CompetitionDetail";
import { Form, Group } from "../../../core/types/Group";

type CreateOrEditGroupFormValue = {
  name: string;
  description: string;
  targetSize: number;
  questions: { questionString: string }[];
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
  const {
    setValue,
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateOrEditGroupFormValue>({
    defaultValues: {
      name: group?.name ?? "",
      description: group?.description ?? "",
      targetSize: group?.targetSize ?? competition.maxSize,
      questions: form?.questions ?? [],
    },
  });
  const { fields, append, remove } = useFieldArray<CreateOrEditGroupFormValue>({
    control,
    name: "questions",
  });
  const session = useSession();
  const router = useRouter();

  const onSubmit = async (values: CreateOrEditGroupFormValue) => {
    const body = {
      competitionId: competition.id,
      name: values.name,
      description: values.description,
      currentSize: 1,
      targetSize: values.targetSize,
      members: [session.data.user.id],
      targetSkills: [], // TODO: implement targetSkills
      form: {
        questions: values.questions.filter(
          (str) => str.questionString.length > 0
        ),
      },
    };

    let group_id: number;
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
    <Stack as="form" width="100%" spacing={5} onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h2" size="lg">
        {group === undefined ? "Create a new group" : `Edit ${group.name}`}
      </Heading>
      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel htmlFor="name">Group name</FormLabel>
        <Input
          id="name"
          placeholder="Name"
          {...register("name", { required: "Please enter a group name" })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message.toString()}
        </FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea
          id="description"
          placeholder="Description"
          {...register("description")}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="targetSize">Target group size</FormLabel>
        <NumberInput
          {...register("targetSize", { valueAsNumber: true })}
          onChange={(valueString) =>
            setValue("targetSize", parseInt(valueString))
          }
          min={competition.minSize}
          max={competition.maxSize}
        >
          <NumberInputField name="targetSize" />
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
      <Spacer />
      <Button
        color="white"
        bg={"secondary"}
        _hover={{ color: "secondary", bg: "gray.50" }}
        rightIcon={<TbSend />}
        width="fit-content"
        alignSelf="flex-end"
        type="submit"
        isLoading={isSubmitting}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default CreateOrEditGroupForm;
