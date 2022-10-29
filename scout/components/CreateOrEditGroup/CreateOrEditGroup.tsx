import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  useColorModeValue,
  Stack,
  Heading,
  Divider,
  Flex,
  HStack,
  Icon,
  Collapse,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiTeamLine } from "react-icons/ri";
import { CompetitionData } from "../../core/types/CompetitionDetail";
import { Form, Group } from "../../core/types/Group";
import CreateOrEditGroupForm from "../Group/CreateOrEditGroupForm";
import PageContainer from "../PageContainer";

const CreateOrEditGroup = ({
  competition,
  group,
  form,
}: {
  competition: CompetitionData;
  group: Group;
  form: Form;
}) => {
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <PageContainer>
      <Stack width="100%" my={8} spacing={8}>
        <Stack spacing={4}>
          <Heading fontWeight="semibold">{competition.name}</Heading>
          <Divider />
        </Stack>
        <Flex flexDirection={{ base: "column-reverse", xl: "row" }} gap={8}>
          <Flex
            width={{ base: "100%", xl: "60%" }}
            rounded="2xl"
            bgColor={bgColor}
            p={8}
          >
            <CreateOrEditGroupForm
              competition={competition}
              group={group}
              form={form}
            />
          </Flex>
          <Flex
            width={{ base: "100%", xl: "40%" }}
            height="100%"
            px={{ base: 0, xl: 8 }}
          >
            <Stack spacing={8}>
              <Stack>
                <HStack>
                  <Icon as={RiTeamLine} />
                  <Text fontSize="lg" fontWeight="medium">
                    Team Size:
                  </Text>
                </HStack>
                <Text>
                  {competition.minSize === competition.maxSize
                    ? `${competition.minSize}\u00A0 members`
                    : `${competition.minSize} - ${competition.maxSize}\u00A0 members`}
                </Text>
              </Stack>
              <Stack>
                <Text fontSize="lg" fontWeight="medium">
                  About
                </Text>
                <Text
                  whiteSpace="pre-line"
                  display={{ base: "none", xl: "block" }}
                >
                  {competition.description}
                </Text>
                <Box display={{ base: "block", xl: "none" }}>
                  <Collapse startingHeight={72} in={show}>
                    <Text whiteSpace="pre-line">{competition.description}</Text>
                  </Collapse>
                </Box>
                <Flex display={{ base: "block", xl: "none" }}>
                  <Button
                    size="md"
                    variant="link"
                    rightIcon={
                      <ChevronDownIcon
                        transform={show ? "rotate(-180deg)" : "rotate(0deg)"}
                      />
                    }
                    onClick={handleToggle}
                  >
                    {show ? "Less" : "More"} details
                  </Button>
                </Flex>
              </Stack>
            </Stack>
          </Flex>
        </Flex>
      </Stack>
    </PageContainer>
  );
};

export default CreateOrEditGroup;
