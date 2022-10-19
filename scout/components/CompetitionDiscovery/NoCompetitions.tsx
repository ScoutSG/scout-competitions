import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Heading, Stack, Text } from "@chakra-ui/react";

const NoCompetitions: React.FC = () => {
  return (
    <Stack spacing={4}>
      <Text>Oops! There is no competition ongoing now.</Text>
      <Heading size="md">Know of One?</Heading>
      <Button rightIcon={<ChevronRightIcon />}>
        Submit the competition details here
      </Button>
    </Stack>
  );
};

export default NoCompetitions;
