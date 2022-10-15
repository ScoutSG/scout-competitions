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
  CircularProgress,
  NumberInputField,
  Center,
} from "@chakra-ui/react";

const Loading = () => {
  return (
    <Center>
      <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
        <WrapItem>
          <CircularProgress isIndeterminate color="primary.500" />
        </WrapItem>
      </Wrap>
    </Center>
  );
};

export default Loading;
