import React from "react";
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
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { BsGithub, BsPerson, BsLinkedin } from "react-icons/bs";
import { ChevronRightIcon } from "@chakra-ui/icons";

const ProfileForm = () => {
  return (
    <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
      <WrapItem>
        <Box bg="white" borderRadius="lg">
          <Box>
            <Heading>Your Details</Heading>
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
                  <Input type="text" size="md" />
                </InputGroup>
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdOutlineEmail color="gray.800" />}
                  />
                  <Input type="text" size="md" />
                </InputGroup>
              </FormControl>
              <FormControl id="year">
                <FormLabel>Year of Study</FormLabel>
                <Input type="text" size="md" placeholder="e.g. Year 4" />
              </FormControl>
              <FormControl id="major">
                <FormLabel>Major</FormLabel>
                <Input
                  type="text"
                  size="md"
                  placeholder="e.g. Computer Science, Business"
                />
              </FormControl>
              <FormControl id="specialization">
                <FormLabel>Speicalization</FormLabel>
                <Input type="text" size="md" placeholder="e.g. Finance" />
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
