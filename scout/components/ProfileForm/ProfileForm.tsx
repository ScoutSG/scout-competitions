import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  NumberInput,
  CircularProgress,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  FormHelperText,
} from "@chakra-ui/react";
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandTelegram,
  TbChevronRight,
  TbMail,
  TbUser,
} from "react-icons/tb";
import clientApi from "../../core/api/client";
import { useCustomToast } from "../../lib/hooks/useCustomToast";
import { useForm } from "react-hook-form";
import Loading from "../Loading";
import { Profile } from "../../core/types/Profile";
import useAnalyticsTracker from "../../lib/hooks/useAnalyticsTracker";

const ProfileForm = () => {
  const {
    setValue,
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Profile>();
  const [isLoading, setIsLoading] = useState(true);
  const { presentToast } = useCustomToast();
  const eventAnalyticsTracker = useAnalyticsTracker("Profile Page");

  useEffect(() => {
    async function getProfileDetails() {
      const response = await clientApi.get("/profile");
      reset(response.data);
      setIsLoading(false);
    }

    getProfileDetails();
  }, []);

  const onSubmit = async (values: Profile) => {
    await eventAnalyticsTracker("Update Profile");
    const updatedProfile = {
      ...values,
      telegramUrl:
        values.telegramUrl[0] === "@"
          ? values.telegramUrl.slice(1)
          : values.telegramUrl,
    };
    try {
      await clientApi.patch("/profile", updatedProfile);
      presentToast({
        title: "Successfully updated your profile!",
        status: "success",
        position: "top",
      });
    } catch (err) {
      presentToast({
        title: "Can't update your profile details",
        position: "top",
        description: "Please check that you've entered the right details",
        status: "error",
      });
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={5}>
      <Box>
        <Heading fontSize="md" fontWeight="semibold">
          Your Details
        </Heading>
        <Text mt={3} color="gray.500">
          Update your profile details so that your group can easily contact you.
        </Text>
      </Box>
      <FormControl id="name">
        <FormLabel>Your Name</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<TbUser color="gray.800" />}
          />
          <Input placeholder="Write your name" {...register("name")} />
        </InputGroup>
      </FormControl>
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<TbMail color="gray.800" />}
          />
          <Input type="email" {...register("email")} />
        </InputGroup>
      </FormControl>
      <FormControl id="year">
        <FormLabel>Year of Study</FormLabel>
        <NumberInput
          placeholder="If you're Year 4, enter 4"
          {...register("yearOfStudy", { valueAsNumber: true })}
          onChange={(valueString) =>
            setValue("yearOfStudy", parseInt(valueString))
          }
          min={Number.MIN_SAFE_INTEGER}
          max={Number.MAX_SAFE_INTEGER}
        >
          <NumberInputField name="targetSize" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl id="major">
        <FormLabel>Major</FormLabel>
        <Input
          placeholder="e.g. Computer Science, Business"
          {...register("major")}
        />
      </FormControl>
      <FormControl id="specialization">
        <FormLabel>Speicalization</FormLabel>
        <Input placeholder="e.g. Finance" {...register("specialisation")} />
      </FormControl>
      <FormControl id="linkedin">
        <FormLabel>LinkedIn URL</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<TbBrandLinkedin color="gray.800" />}
          />
          <Input
            placeholder="https://www.linkedin.com/in/johndoe"
            {...register("linkedinUrl")}
          />
        </InputGroup>
      </FormControl>
      <FormControl id="GitHub">
        <FormLabel>GitHub URL</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<TbBrandGithub color="gray.800" />}
          />
          <Input
            placeholder="https://www.github.com/johndoe"
            {...register("gitHubUrl")}
          />
        </InputGroup>
      </FormControl>
      <FormControl id="telegram">
        <FormLabel>Telegram Username</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<TbBrandTelegram color="gray.800" />}
          />
          <Input placeholder="username" {...register("telegramUrl")} />
        </InputGroup>
        <FormHelperText>
          For a smoother user experience, please add @scoutsg as a contact on
          Telegram.
        </FormHelperText>
      </FormControl>
      <Button
        bgColor="primary.500"
        color="white"
        _hover={{
          bgColor: "gray.50",
          color: "primary.500",
        }}
        rightIcon={<TbChevronRight />}
        type="submit"
        maxWidth="fit-content"
        isLoading={isSubmitting}
        alignSelf="flex-end"
      >
        Update
      </Button>
    </Stack>
  );
};

export default ProfileForm;
