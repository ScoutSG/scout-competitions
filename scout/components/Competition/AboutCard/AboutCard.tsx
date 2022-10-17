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
  Icon,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

import { CompetitionDataSummary } from "../../../core/types/CompetitionDetail";
import { formatDate } from "../../../core/utils/date";
import { TbClock } from "react-icons/tb";

type AboutCardProps = {
  data: CompetitionDataSummary;
  hideFindATeam?: boolean;
};

const AboutCard: React.FC<AboutCardProps> = (props) => {
  const { id, deadline, organiserName, description, link, maxSize, minSize } =
    props.data;

  const onSeeMore = () => {
    window.open(link, "_blank");
  };

  return (
    <Box>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Stack direction="row" align="center" color="red.400">
            <Icon as={TbClock} />
            <Text fontWeight="semibold">Sign Up by {formatDate(deadline)}</Text>
          </Stack>

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
        </Stack>

        <Box>
          <Heading size="sm">About</Heading>
          <Text>{description}</Text>
        </Box>

        <ButtonGroup>
          <Button
            rightIcon={<ChevronRightIcon />}
            width="100%"
            onClick={onSeeMore}
          >
            Visit site
          </Button>
          {props.hideFindATeam ? null : (
            <NextLink href={`/competitions/${id}`}>
              <Button
                rightIcon={<ChevronRightIcon />}
                width="100%"
                color="white"
                bg={"primary.500"}
                _hover={{ color: "primaryLight", bg: "gray.200" }}
              >
                Find a team
              </Button>
            </NextLink>
          )}
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

export default AboutCard;
