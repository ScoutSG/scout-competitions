import { Flex, Stack, Text } from "@chakra-ui/react";
import Linkify from "react-linkify";
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
        <Linkify>
          {competition.description.split("\\n").map((text) => (
            <Text whiteSpace="pre-line">{text}</Text>
          ))}
        </Linkify>
      </Stack>
      <CompetitionInformation competition={competition} xlDisplay="flex" />
    </Flex>
  );
};

export default CompetitionDetailsTab;
