import {
  Flex,
  Stack,
  Text,
  useColorModeValue,
  Button,
  Spacer,
  Link,
} from "@chakra-ui/react";
import { CompetitionDataSummary } from "../../core/types/CompetitionDetail";
import CompetitionSummaryCard from "./CompetitionSummaryCard";
import NoCompetitions from "./NoCompetitions";
import useAnalyticsTracker from "../../lib/hooks/useAnalyticsTracker";
import {
  BETA_FEEDBACK_LINK,
  SUGGEST_COMPETITION_LINK,
} from "../../core/constants";

const CompetitionSummaryView: React.FC<{
  competitions: CompetitionDataSummary[];
}> = ({ competitions }) => {
  const eventAnalyticsTracker = useAnalyticsTracker("Competition Discovery");
  return (
    <>
      <Flex width="100%" justifyContent="center">
        {competitions.length === 0 ? (
          <NoCompetitions />
        ) : (
          <Stack width="100%" spacing={8} maxWidth="6xl" mb={8}>
            <Text
              mt={8}
              fontSize="lg"
              textColor={useColorModeValue("gray.500", "gray.300")}
            >
              Showing {competitions.length} competitions
              <Spacer />
              Know of a competition that isn't listed here?{" "}
              <Link
                href={SUGGEST_COMPETITION_LINK}
                target="_blank"
                color="teal"
                fontWeight="semibold"
              >
                Let us know!
              </Link>
            </Text>

            {competitions.map((competition) => (
              <CompetitionSummaryCard
                key={competition.id}
                competition={competition}
              />
            ))}
          </Stack>
        )}
      </Flex>
    </>
  );
};

export default CompetitionSummaryView;
