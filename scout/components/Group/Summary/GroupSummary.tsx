import React, { useState } from "react";

import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Badge,
  Button,
  Avatar,
  AvatarGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ButtonGroup,
} from "@chakra-ui/react";
import { TbSend, TbShare, TbBrandTelegram, TbCopy } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/router";
import { GroupSummaryData } from "../../../core/types/CompetitionDetail";
import { useIsMember } from "../../../lib/hooks/useUserDetails";
import { useUrlClipboard } from "../../../lib/hooks/useCustomClipboard";

const GroupSummaryCard = ({
  group,
  isMemberOfCompetition,
}: {
  group: GroupSummaryData;
  isMemberOfCompetition: boolean;
}) => {
  const router = useRouter();
  const isMember = useIsMember(group.members);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const groupLink = `/competitions/${router.query.competitionId}/groups/${group.id}`;
  const clipboard = useUrlClipboard(groupLink);

  function linkify(inputText) {
    //URLs starting with http://, https://, or ftp://
    var replacePattern1 =
      /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    var replacedText = inputText.replace(
      replacePattern1,
      '<a href="$1" target="_blank">$1</a>'
    );

    //URLs starting with www. (without // before it, or it'd re-link the ones done above)
    var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    var replacedText = replacedText.replace(
      replacePattern2,
      '$1<a href="http://$2" target="_blank">$2</a>'
    );

    //Change email addresses to mailto:: links
    var replacePattern3 =
      /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim;
    var replacedText = replacedText.replace(
      replacePattern3,
      '<a href="mailto:$1">$1</a>'
    );

    return replacedText;
  }

  const shareViaTelegram = () => {
    const message = `My team, ${group.name}, is participating in a competition! \n Join us!`;
    const link = encodeURIComponent(window.location.origin + groupLink);

    window.open(
      "https://t.me/share/?url=" + link + "&text=" + `\n ${message}`,
      "_blank"
    );
  };

  const getAvatarIcons = () => {
    let avatarIcons: React.ReactElement[] = [];
    for (let i = 0; i < group.targetSize; i++) {
      if (i < group.currentSize) {
        avatarIcons.push(<Avatar bgColor="primaryLight" />);
      } else {
        avatarIcons.push(<Avatar />);
      }
    }

    return avatarIcons;
  };

  return (
    <Center py={2}>
      <Stack
        w={"full"}
        rounded="xl"
        px={2}
        py={2}
        overflow={"hidden"}
        spacing={2}
        borderWidth={1}
        _hover={{ bgColor: "gray.100" }}
        borderColor="gray.400"
      >
        <Stack spacing={2}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
          >
            <Heading fontSize={"lg"} fontWeight="black">
              {group.name}
            </Heading>

            <AvatarGroup size="xs" max={4} spacing={0.25} fontSize="10px">
              {getAvatarIcons().map((avatar) => avatar)}
            </AvatarGroup>
          </Stack>

          <Stack spacing={2}>
            <Text fontWeight="bold">Description</Text>
            <Text>{group.description}</Text>
          </Stack>

          {group.targetSkills.length === 0 ? null : (
            <Stack spacing={2}>
              <Text fontWeight="semibold">Skills</Text>
              <Box>
                {group.targetSkills.map((skill) => (
                  <Badge
                    px={2}
                    py={1}
                    bg={useColorModeValue("gray.50", "gray.800")}
                    fontWeight={"400"}
                    m={1}
                    textTransform="capitalize"
                  >
                    #{skill}
                  </Badge>
                ))}
              </Box>
            </Stack>
          )}
        </Stack>

        {isMember ? (
          <Stack direction="row">
            <Button
              leftIcon={<TbShare />}
              variant="solid"
              color="white"
              bgColor="primary.500"
              _hover={{ color: "primary.500", bgColor: "transparent" }}
              onClick={onOpen}
            >
              Share
            </Button>
            <Link href={groupLink}>
              <Button color="primary.500" bgColor="transparent" _hover={{}}>
                View group
              </Button>
            </Link>
          </Stack>
        ) : group.currentSize === group.targetSize ? (
          <Button disabled>Team is full</Button>
        ) : (
          <Link href={groupLink}>
            <Button
              leftIcon={<TbSend />}
              w="fit-content"
              color="primary.500"
              bgColor="transparent"
              _hover={{}}
              disabled={isMemberOfCompetition}
            >
              Request to join
            </Button>
          </Link>
        )}
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Share {group.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Share this link so that your peers can submit a request to your
              team!
            </ModalBody>
            <ModalFooter>
              <ButtonGroup>
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  leftIcon={<TbBrandTelegram />}
                  onClick={shareViaTelegram}
                >
                  Telegram
                </Button>
                <Button
                  leftIcon={<TbCopy />}
                  variant="outline"
                  colorScheme="black"
                  rounded="3xl"
                  onClick={clipboard.onCopy}
                >
                  {clipboard.hasCopied ? "Copied" : "Copy Link"}
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Center>
  );
};

export default GroupSummaryCard;
