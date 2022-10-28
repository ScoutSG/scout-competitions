import {
  FormControl,
  FormLabel,
  Heading,
  Alert,
  AlertIcon,
  Checkbox,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import clientApi from "../../../core/api/client";
import { Group } from "../../../core/types/Group";
import { Profile } from "../../../core/types/Profile";
import { CreateOrEditGroupFormValue } from "./types";
import { TbBrandTelegram } from "react-icons/tb";
import Explanation from "../../Explanation";

type TelegramSubFormProps = Pick<
  UseFormReturn<CreateOrEditGroupFormValue>,
  "register" | "control"
> & {
  group: Group;
};

const CHECKBOX_TEXT = "Create a Telegram group for this team";
const HELPER_TEXT =
  "This chat will be notified when new people request to join your team. When new members are approved, they will automatically be added to the group chat.";

const formLabel = (
  <FormLabel htmlFor="withTelegramGroup">
    <Heading as="h3" size="md" display="inline">
      One-click Telegram Group Setup
    </Heading>
    <Explanation label={HELPER_TEXT} />
  </FormLabel>
);
export default function TelegramSubForm({
  control,
  register,
  group,
}: TelegramSubFormProps) {
  const [profile, setProfile] = useState<Partial<Profile>>({});

  const isChecked = useWatch({ control, name: "withTelegramGroup" });

  useEffect(() => {
    clientApi.get("/profile").then((response) => {
      setProfile(response.data);
    });
  }, []);

  // if leader has no Telegram username, and they check, then show the tg username field
  if (!profile.telegramUrl) {
    return (
      <>
        <FormControl>
          {formLabel}
          <Checkbox {...register("withTelegramGroup")}>
            {CHECKBOX_TEXT}
          </Checkbox>
        </FormControl>
        {isChecked ? (
          <FormControl isRequired>
            <FormLabel htmlFor="name">Telegram Username</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<TbBrandTelegram color="gray.800" />}
              />
              <Input placeholder="username" {...register("telegramUrl")} />
            </InputGroup>
          </FormControl>
        ) : null}
      </>
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
            There's already a Telegram group chat linked to this group!
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
