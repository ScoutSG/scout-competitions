import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { CompetitionDataSummary } from "../../core/types/CompetitionDetail";
import CompetitionSummaryCard from "./CompetitionSummaryCard";
import NoCompetitions from "./NoCompetitions";

const CompetitionSummaryView: React.FC<{
  competitions: CompetitionDataSummary[];
}> = ({ competitions }) => {
  return (
    <>
      <Flex width="100%" justifyContent="center">
        {competitions.length === 0 ? (
          <NoCompetitions />
        ) : (
          <Stack 
            width="100%"
            spacing={8}
            maxWidth="6xl"
            mb={8}
          >
            <Text
              mt={8}
              fontSize="lg"
              textColor={useColorModeValue("gray.500", "gray.300")}
            >
              Showing {competitions.length} competitions. Can't find a competition or want to organise one? Contact us!
            </Text>
            {competitions.map((competition) => (
              <CompetitionSummaryCard competition={competition} />
            ))}
          </Stack>
        )}
      </Flex>
    </>
  );
};

export default CompetitionSummaryView;
