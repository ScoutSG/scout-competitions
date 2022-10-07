import React from "react";
import {
  Heading,
  Box,
  Stack,
  Text,
  Badge,
  SimpleGrid,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";

import { CompetitionDataSummary } from "../../../core/types/CompetitionDetail";
import { formatDate } from "../../../core/utils/date";

type AboutCardProps = {
  data: CompetitionDataSummary;
  hideFindATeam?: boolean;
};

const AboutCard: React.FC<AboutCardProps> = (props) => {
  const { deadline, organiserName, description, link, maxSize, minSize } =
    props.data;

  const onSeeMore = () => {
    window.open(link, "_blank");
  };

  return (
    <Box>
      <Stack spacing={4}>
        <Box>
          <Heading size="md">About</Heading>
          <Text>{description}</Text>
        </Box>

        <SimpleGrid columns={3} minChildWidth="90px">
          <Box>
            <Heading size="xs">Deadline</Heading>
            <Badge borderRadius={"7px"}>{formatDate(deadline)}</Badge>
          </Box>

          <Box>
            <Heading size="xs">Group Size</Heading>
            <Badge borderRadius={"7px"}>
              {minSize === null && maxSize === null
                ? "Unrestricted"
                : minSize === null
                ? maxSize
                : maxSize === null
                ? minSize
                : minSize + " - " + maxSize}
            </Badge>
          </Box>

          <Box>
            <Heading size="xs">Organiser</Heading>
            <Badge borderRadius={"7px"}>{organiserName}</Badge>
          </Box>
        </SimpleGrid>
        <ButtonGroup>
          <Button
            rightIcon={<ChevronRightIcon />}
            width="100%"
            onClick={onSeeMore}
          >
            Visit site
          </Button>
          {props.hideFindATeam ? null : (
            <Button
              rightIcon={<ChevronRightIcon />}
              width="100%"
              color="white"
              bg={"primary.500"}
              _hover={{ color: "primaryLight", bg: "gray.200" }}
            >
              Find a team
            </Button>
          )}
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

export default AboutCard;
