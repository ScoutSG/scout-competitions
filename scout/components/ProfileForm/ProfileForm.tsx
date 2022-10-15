import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { BsGithub, BsPerson, BsLinkedin, BsTelegram } from "react-icons/bs";
import { ChevronRightIcon } from "@chakra-ui/icons";
import clientApi from "../../core/api/client";
import { useCustomToast } from "../../lib/hooks/useCustomToast";
import Loading from "../Loading";

interface Profile {
  id: string | null;
  name: string | null;
  yearOfStudy: string | null;
  email: string | null;
  major: string | null;
  specialisation: string | null;
  linkedinUrl: string | null;
  gitHubUrl: string | null;
  telegramUrl: string | null;
}

const ProfileForm = ({ displayAll }: { displayAll?: boolean }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { presentToast } = useCustomToast();

  useEffect(() => {
    async function getProfileDetails() {
      const response = await clientApi.get("/profile");

      setProfile(response.data);
    }

    getProfileDetails();
  }, []);

  const updateProfile = async () => {
    const body = {
      ...profile,
      yearOfStudy: parseInt(profile.yearOfStudy) || null,
    };

    await clientApi
      .patch("/profile", body)
      .then((res) => {
        presentToast({
          title: "Successfully updated your profile!",
          status: "success",
          position: "top",
        });
      })
      .catch((err) => {
        presentToast({
          title: "Can't update your profile details",
          position: "top",
          description: "Please check that your field entries are accurate",
          status: "error",
        });
      });
  };

  return profile === null ? (
    <Loading />
  ) : (
    <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
      <WrapItem>
        <Box bg="white" borderRadius="lg">
          <Box>
            <Heading fontSize="md" fontWeight="semibold">
              Your Details
            </Heading>
            <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
              Update your profile details so that your group can easily contact
              you.
            </Text>
          </Box>
          <Box m={8}>
            <VStack spacing={5}>
              <FormControl id="name">
                <FormLabel>Your Name</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BsPerson color="gray.800" />}
                  />
                  <Input
                    type="text"
                    size="md"
                    placeholder={"Write your name"}
                    value={profile.name}
                    onChange={(event) =>
                      setProfile({
                        ...profile,
                        name: event.target.value,
                      })
                    }
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdOutlineEmail color="gray.800" />}
                  />
                  <Input
                    type="text"
                    size="md"
                    value={profile.email}
                    onChange={(event) =>
                      setProfile({ ...profile, email: event.target.value })
                    }
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="year">
                <FormLabel>Year of Study</FormLabel>
                <NumberInput
                  value={
                    profile.yearOfStudy === null ? "" : profile.yearOfStudy
                  }
                >
                  <NumberInputField
                    placeholder="If you're Year 4, enter 4"
                    onChange={(event) =>
                      setProfile({
                        ...profile,
                        yearOfStudy: event.target.value,
                      })
                    }
                  />
                </NumberInput>
              </FormControl>
              <FormControl id="major">
                <FormLabel>Major</FormLabel>
                <Input
                  type="text"
                  size="md"
                  placeholder="e.g. Computer Science, Business"
                  value={profile.major}
                  onChange={(event) =>
                    setProfile({ ...profile, major: event.target.value })
                  }
                />
              </FormControl>
              <FormControl id="specialization">
                <FormLabel>Speicalization</FormLabel>
                <Input
                  type="text"
                  size="md"
                  placeholder="e.g. Finance"
                  value={profile.specialisation}
                  onChange={(event) =>
                    setProfile({
                      ...profile,
                      specialisation: event.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl id="linkedin">
                <FormLabel>LinkedIn URL</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BsLinkedin color="gray.800" />}
                  />
                  <Input
                    type="text"
                    size="md"
                    placeholder="https://www.linkedin.com/in/johndoe"
                    value={profile.linkedinUrl}
                    onChange={(event) =>
                      setProfile({
                        ...profile,
                        linkedinUrl: event.target.value,
                      })
                    }
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="GitHub">
                <FormLabel>GitHub URL</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BsGithub color="gray.800" />}
                  />
                  <Input
                    type="text"
                    size="md"
                    placeholder="https://www.github.com/johndoe"
                    value={profile.gitHubUrl}
                    onChange={(event) =>
                      setProfile({
                        ...profile,
                        gitHubUrl: event.target.value,
                      })
                    }
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="Telegram">
                <FormLabel>Telegram URL</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BsTelegram color="gray.800" />}
                  />
                  <Input
                    type="text"
                    size="md"
                    placeholder="@username"
                    value={profile.telegramUrl}
                    onChange={(event) =>
                      setProfile({
                        ...profile,
                        telegramUrl: event.target.value,
                      })
                    }
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="name" float="right">
                <Button
                  bgColor="primary.500"
                  color="white"
                  _hover={{
                    bgColor: "gray.50",
                    color: "primary.500",
                  }}
                  rightIcon={<ChevronRightIcon />}
                  onClick={updateProfile}
                >
                  Update
                </Button>
              </FormControl>
            </VStack>
          </Box>
        </Box>
      </WrapItem>
    </Wrap>
  );
};

export default ProfileForm;
