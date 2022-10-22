import {
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CompetitionData } from "../../core/types/CompetitionDetail";
import CompetitionInformation from "./CompetitionInformation";

const CompetitionDetailsTab = ({
  competition,
}: {
  competition: CompetitionData;
}) => {
  return (
    <Flex
      align="flex-start"
      flexDirection={{ base: "column-reverse", xl: "row" }}
      gap={{ base: 4, xl: 8 }}
    >
      <Stack width={{ base: "100%", xl: "60%" }} pr={8}>
        <Text fontSize="xl" fontWeight="semibold">
          About
        </Text>
        <Text whiteSpace="pre-line">{competition.description}</Text>
      </Stack>
      <CompetitionInformation competition={competition} xlDisplay="flex" />
    </Flex>
  );
};

export default CompetitionDetailsTab;
