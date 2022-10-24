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
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import clientApi from "../../../core/api/client";
import { Group } from "../../../core/types/Group";
import { Profile } from "../../../core/types/Profile";
import { CreateOrEditGroupFormValue } from "./types";
import { TbBrandTelegram, TbChevronRight, TbPlus } from "react-icons/tb";

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
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    clientApi
      .get("/profile")
      .then((response) => {
        setProfile(response.data);
      })
      .catch((err) => {
        setIsAuthenticated(false);
      });
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
      <>
        <FormControl>
          {formLabel}
          <Alert status="info" rounded="xl" mt={3} mb={3}>
            <AlertIcon />
            <Text>
              {isAuthenticated
                ? "You haven't indicated your Telegram username. Check this box to tell us your telegram username and we'll create the group for you!"
                : "You're not signed in. Check this box to tell us your telegram username and we'll create the group for you!"}
            </Text>
          </Alert>
          <Checkbox isChecked={isCheck} onChange={() => setIsCheck(!isCheck)}>
            {CHECKBOX_TEXT}
          </Checkbox>
        </FormControl>
        {isCheck ? (
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
