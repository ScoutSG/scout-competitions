import { useEffect } from "react";
import { ArrowForwardIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { CompetitionData } from "../../core/types/CompetitionDetail";
import PageContainer from "../PageContainer";
import useAnalyticsTracker from "../../lib/hooks/useAnalyticsTracker";
import NotFound from "../NotFound";
import useIsMemberOfCompetition from "./useIsMemberOfCompetition";
import CompetitionDescription from "./CompetitionDescription";
import { useHasDeleteGroup } from "../../lib/hooks/useEditDeleteGroup";
import { useRouter } from "next/router";

const CompetitionDetails: React.FC = ({
  competition,
}: {
  competition: CompetitionData;
}) => {
  const { isMember } = useIsMemberOfCompetition(competition.id);
  const { hasDelete, setHasDelete } = useHasDeleteGroup();
  const router = useRouter();
  const eventAnalyticsTracker = useAnalyticsTracker(
    "Competition Details " + competition?.name
  );

  console.log(isMember);

  if (!competition) {
    return <NotFound />;
  }

  useEffect(() => {
    if (hasDelete) {
      router.reload();
    }
    setHasDelete(false);
  }, [hasDelete]);

  return (
    <PageContainer>
      <Stack width="100%" my={8} px={0} spacing={4}>
        <Flex
          align="flex-end"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={4}
        >
          <Heading fontWeight="semibold" mr={16}>
            {competition.name}
          </Heading>
          <HStack spacing={isMember ? 0 : 4}>
            <Link href={`/competitions/${competition.id}/groups`}>
              <Button
                leftIcon={<PlusSquareIcon />}
                size={{ base: "md", md: "lg" }}
                colorScheme="cyan"
                variant="outline"
                display={isMember ? "none" : "flex"}
                onClick={async () => {
                  await eventAnalyticsTracker(
                    "Lead a team for " + competition.name
                  );
                }}
              >
                Lead a team
              </Button>
            </Link>
            <Link
              href={competition.link}
              passHref
              onClick={async () => {
                await eventAnalyticsTracker(
                  "Visited External Website " + competition.name
                );
              }}
            >
              <a target="_blank" rel="noopener noreferrer">
                <Button
                  size={{ base: "md", md: "lg" }}
                  rightIcon={<ArrowForwardIcon />}
                  colorScheme="teal"
                >
                  Visit website
                </Button>
              </a>
            </Link>
          </HStack>
        </Flex>
        <Divider />
        <CompetitionDescription
          competition={competition}
          groups={competition.groups}
        />
      </Stack>
    </PageContainer>
  );
};

export default CompetitionDetails;
