import {
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Spacer,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { TbSend } from "react-icons/tb";

import clientApi from "../../../core/api/client";
import { CompetitionData } from "../../../core/types/CompetitionDetail";
import { Form, Group } from "../../../core/types/Group";
import { useCustomToast } from "../../../lib/hooks/useCustomToast";
import { useDraftGroup } from "../../../lib/hooks/useDraftGroup";

import QuestionsSubForm from "./QuestionsSubForm";
import SkillsSubForm, { toOptionType } from "./SkillsSubForm";
import { CreateOrEditGroupFormValue } from "./types";

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
      targetSkills: group?.targetSkills.map(toOptionType) ?? [],
      questions: form?.questions ?? [],
    },
  });
  const session = useSession();
  const router = useRouter();
  const { setDraftGroup } = useDraftGroup();
  const { presentToast } = useCustomToast();

  const onSubmit = async (values: CreateOrEditGroupFormValue) => {
    const groupInfo = {
      competitionId: competition.id,
      name: values.name,
      description: values.description,
      currentSize: 1,
      targetSize: values.targetSize,
      targetSkills: values.targetSkills.map(({ value }) => value),
      form: {
        questions: values.questions.filter(
          (str) => str.questionString.length > 0
        ),
      },
    };
    if (session.status === "authenticated") {
      const body = {
        ...groupInfo,
        members: [session.data.user.id],
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
    } else {
      setDraftGroup(groupInfo);
      router.push("/auth/signin");
      presentToast({
        title:
          "Almost there! Login to finish creating your group. Don't worry, your group details will be saved.",
        position: "top",
        status: "info",
      });
    }
  };

  return (
    <Stack as="form" width="100%" spacing={5} onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h2" size="lg">
        {group === undefined ? "Create a new group" : `Edit ${group.name}`}
      </Heading>
      <FormControl isRequired isInvalid={Boolean(errors.name)}>
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
      <SkillsSubForm control={control} />
      <QuestionsSubForm control={control} register={register} />
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
