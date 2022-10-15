import React, { useState } from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Icon,
  Badge,
  Button,
  ButtonGroup,
  Fade,
} from "@chakra-ui/react";
import { CompetitionDataSummary } from "../../../core/types/CompetitionDetail";
import { daysLeft } from "../../../core/utils/date";
import { MdCircle } from "react-icons/md";
import { VscOctoface } from "react-icons/vsc";
import { MdTimer } from "react-icons/md";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { maxWidth } from "../../../core/utils/maxWidth";
import NextLink from "next/link";

const CompetitionSummaryCard: React.FC<{
  competition: CompetitionDataSummary;
}> = ({ competition }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <Center py={2}>
      <NextLink href={`/competitions/${competition.id}`}>
        <a>
          <Box
            w={"100vw"}
            maxW={maxWidth}
            rounded={"md"}
            py={2}
            px={4}
            overflow={"hidden"}
            _hover={{ bgColor: "gray.100" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Stack direction="column" spacing={4}>
              <Stack
                direction="row"
                align="center"
                color="red.400"
                bgColor="transparent"
              >
                <Icon as={MdTimer} />
                <Text fontWeight={800} fontSize={"sm"}>
                  {daysLeft(competition.deadline) < 0
                    ? "Expired"
                    : daysLeft(competition.deadline) + " days left"}
                </Text>
              </Stack>

              <Heading fontSize={"lg"}>{competition.name}</Heading>
              <Stack
                direction={{ base: "column", md: "row" }}
                align={{ base: "normal", md: "center" }}
                spacing={{ base: 2, md: 5 }}
              >
                {competition.organiserName === "" ? null : (
                  <Badge
                    w="fit-content"
                    py={1}
                    px={2}
                    colorScheme="green"
                    textTransform="capitalize"
                  >
                    <Stack direction="row" align="center">
                      <Icon as={VscOctoface} />
                      <Text>Organised by {competition.organiserName}</Text>
                    </Stack>
                  </Badge>
                )}
                <Stack direction="row" align="center">
                  <Icon
                    color={
                      competition.groups.length === 0 ? "red.500" : "green.500"
                    }
                    as={MdCircle}
                  />
                  <Text fontWeight="medium" fontSize="small">
                    {competition.groups.length === 0
                      ? "No"
                      : competition.groups.length}{" "}
                    groups participating
                  </Text>
                </Stack>
              </Stack>

              <Stack>
                <Text noOfLines={{ base: 5, md: 100 }}>
                  {competition.description}
                </Text>
              </Stack>
              {isHovering ? (
                <Fade in={isHovering}>
                  <Button
                    rightIcon={<ChevronRightIcon />}
                    width="100%"
                    color="primary.500"
                    bgColor="transparent"
                    transition="ease-in-out"
                    _hover={{}}
                  >
                    See More Details
                  </Button>
                </Fade>
              ) : null}
            </Stack>
          </Box>
        </a>
      </NextLink>
    </Center>
  );
};

export default CompetitionSummaryCard;
