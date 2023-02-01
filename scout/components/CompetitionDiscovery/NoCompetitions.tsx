import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Heading, Stack, Text, Link } from "@chakra-ui/react";
import { SUGGEST_COMPETITION_LINK } from "../../core/constants";

const NoCompetitions: React.FC = () => {
  return (
    <Stack spacing={4}>
      <Text>Oops! There is no competition ongoing now.</Text>
      <Heading size="md">Know of One?</Heading>
      <Button rightIcon={<ChevronRightIcon />}>
        <Link
          isExternal={true}
          href={SUGGEST_COMPETITION_LINK}
          target="_blank"
          fontWeight="semibold"
          color="blue.500"
        >
          Submit the competition details
        </Link>
      </Button>
    </Stack>
  );
};

export default NoCompetitions;
