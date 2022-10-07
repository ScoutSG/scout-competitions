import { ReactElement } from "react";
import { Box, Text, Stack, Flex } from "@chakra-ui/react";

interface StepProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Step = ({ title, text, icon }: StepProps) => {
  return (
    <Box borderWidth={"1px"} borderRadius={10} p={5}>
      <Stack>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={"gray.300"}
          mb={1}
        >
          {icon}
        </Flex>
        <Text fontWeight={600}>{title}</Text>
        <Text color={"gray.600"}>{text}</Text>
      </Stack>
    </Box>
  );
};

export default Step;
