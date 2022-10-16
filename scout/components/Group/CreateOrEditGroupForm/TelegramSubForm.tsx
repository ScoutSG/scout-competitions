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

const isTelegramUsernameMissing = (profile: Partial<Profile>) =>
  profile.telegramUrl === "" || profile.telegramUrl === null;

type TelegramSubFormProps = Pick<
  UseFormReturn<CreateOrEditGroupFormValue>,
  "register"
> & {
  group: Group;
};

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
  if (isTelegramUsernameMissing(profile)) {
    return (
      <FormControl>
        {formLabel}
        <Alert status="info">
          <AlertIcon />
          <Text>
            You haven't indicated your Telegram username! You won't be able to
            use this feature until you add your Telegram username to your
            profile.
          </Text>
        </Alert>
        <Checkbox disabled isChecked={false}>
          Create a Telegram group for this team and automatically add team
          members into the group chat upon approval
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
          Create a Telegram group for this team and automatically add team
          members into the group chat upon approval
        </Checkbox>
      </FormControl>
    );
  }
  return (
    <FormControl>
      {formLabel}
      <Checkbox {...register("withTelegramGroup")}>
        Create a Telegram group for this team and automatically add team members
        into the group chat upon approval
      </Checkbox>
    </FormControl>
  );
}
