import {
  Flex,
  Stack,
  Text,
  useColorModeValue,
  Spacer,
  Link
} from "@chakra-ui/react";
import { CompetitionDataSummary } from "../../core/types/CompetitionDetail";
import CompetitionSummaryCard from "./CompetitionSummaryCard";
import NoCompetitions from "./NoCompetitions";
import useAnalyticsTracker from "../../lib/hooks/useAnalyticsTracker";
import {
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
              Showing {competitions.length} competition
              {competitions.length === 1 ? "" : "s"}
              <Spacer />
              Know of a competition that isn't listed here?{" "}
              <Link
                isExternal={true}
                href={SUGGEST_COMPETITION_LINK}
                target="_blank"
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
