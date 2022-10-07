import React from "react";
import {
  Heading,
  Box,
  Stack,
  Text,
  Badge,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";

import { CompetitionAboutCard } from "../../../core/types/CompetitionDetail";

const AboutCard: React.FC<CompetitionAboutCard> = (props) => {
  const {
    deadline,
    organiserName,
    description,
    urlLink,
    maxSize,
    minSize,
  } = props;

  const onSeeMore = () => {
    window.open(urlLink, "_blank");
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
            <Badge borderRadius={"7px"}>{deadline}</Badge>
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
        <Button
          rightIcon={<ChevronRightIcon />}
          w={{ base: "full", md: "fit-content" }}
          onClick={onSeeMore}
          fontSize="small"
        >
          Visit site
        </Button>
      </Stack>
    </Box>
  );
};

export default AboutCard;
