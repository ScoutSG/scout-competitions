import {
  FormControl,
  FormLabel,
  Heading,
  Alert,
  AlertIcon,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import clientApi from "../../../core/api/client";
import { Group } from "../../../core/types/Group";
import { Profile } from "../../../core/types/Profile";
import { CreateOrEditGroupFormValue } from "./types";

type TelegramSubFormProps = Pick<
  UseFormReturn<CreateOrEditGroupFormValue>,
  "register"
> & {
  group: Group;
};

const CHECKBOX_TEXT =
  "Create a Telegram group for this team and automatically add team members into the group chat upon approval. This chat will also be used for notifications when new people request to join your team.";

export default function TelegramSubForm({
  register,
  group,
}: TelegramSubFormProps) {
  const [profile, setProfile] = useState<Partial<Profile>>({});
  useEffect(() => {
    clientApi.get("/profile").then((response) => setProfile(response.data));
  }, []);

  const formLabel = (
    <FormLabel htmlFor="withTelegramGroup">
      <Heading as="h3" size="md">
        Create Telegram Group
      </Heading>
    </FormLabel>
  );

  // if leader has no Telegram username, cannot check
  if (!profile.telegramUrl) {
    return (
      <FormControl>
        {formLabel}
        <Alert status="info" rounded="xl">
          <AlertIcon />
          <Text>
            You haven't indicated your Telegram username! You won't be able to
            use this feature until you add your Telegram username to your
            profile.
          </Text>
        </Alert>
        <Checkbox disabled isChecked={false}>
          {CHECKBOX_TEXT}
        </Checkbox>
      </FormControl>
    );
  }

  // if there is already a group associated, cannot uncheck
  if (group?.telegramLink !== null && group?.telegramLink !== undefined) {
    return (
      <FormControl>
        {formLabel}
        <Alert status="info">
          <AlertIcon />
          <Text>
            There's already a Telegram group chat linked to this group! If your
            team is complete, you may remove @scoutsg from your group chat.
          </Text>
        </Alert>
        <Checkbox disabled isChecked>
          {CHECKBOX_TEXT}
        </Checkbox>
      </FormControl>
    );
  }
  return (
    <FormControl>
      {formLabel}
      <Checkbox {...register("withTelegramGroup")}>{CHECKBOX_TEXT}</Checkbox>
    </FormControl>
  );
}
