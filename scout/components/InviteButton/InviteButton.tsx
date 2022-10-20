import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Text,
  Alert,
  AlertTitle,
  AlertDescription,
  Stack,
  AlertIcon,
  Box,
  Center,
} from "@chakra-ui/react";
import { TbSend, TbShare, TbBrandTelegram, TbCopy } from "react-icons/tb";
import { useRouter } from "next/router";
import clientApi from "../../core/api/client";
import { AxiosResponse } from "axios";
import { useCustomToast } from "../../lib/hooks/useCustomToast";
import Loading from "../Loading";

const useInvite = () => {
  const [code, setCode] = useState<string>("");
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const [inviteLink, setInviteLink] = useState("");
  const inviteLinkBase = `${
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : ""
  }/join/`;

  useEffect(() => {
    const copyValue = async (val) => {
      try {
        await window.navigator.clipboard.writeText(val);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    };

    if (code.length > 0) {
      const link = inviteLinkBase + code;

      copyValue(link)
        .then(() => setInviteLink(link))
        .then(() => setHasCopied(true));
    }

    return () => {
      setHasCopied(false);
      setInviteLink("");
    };
  }, [code]);

  useEffect(() => {
    if (hasCopied) {
      setTimeout(() => {
        setHasCopied(false);
      }, 3000);
    }
  }, [hasCopied]);

  return { setCode, hasCopied, inviteLink };
};

const InviteButton = ({ group }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { presentToast } = useCustomToast();
  const { setCode, hasCopied, inviteLink } = useInvite();

  const generateLink = async () => {
    setIsLoading(true);
    const body = {
      groupId: group.id,
    };

    let response: AxiosResponse;

    try {
      response = await clientApi.post("/invitations", body);
    } catch (err) {
      console.log(err);
      presentToast({
        title: "Failed to generate link",
        status: "error",
        position: "top",
      });
    } finally {
      if (response || response.data) {
        setCode(response.data.code);
      }
    }
    setIsLoading(false);
  };
  return (
    <>
      <Button
        variant="ghost"
        color="primary.500"
        _hover={{ color: "white", bgColor: "primary.500" }}
        onClick={onOpen}
        w="fit-content"
      >
        Invite
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Invite</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Alert status="warning">
                <Stack direction="column">
                  <Stack direction="row">
                    <AlertIcon />
                    <AlertTitle>Important!</AlertTitle>
                  </Stack>
                  <AlertDescription>
                    Sending this unique link will automatically add the user
                    into the group.
                  </AlertDescription>
                </Stack>
              </Alert>
            </ModalBody>

            <ModalBody>
              {inviteLink.length === 0 ? null : (
                <Stack spacing={2}>
                  <Text fontWeight="bold">Invite Link</Text>
                  <Box borderWidth={1} px={4} py={2}>
                    <Center>{inviteLink}</Center>
                  </Box>
                </Stack>
              )}
            </ModalBody>
            <ModalFooter>
              {isLoading ? (
                <Box>
                  <Loading />
                </Box>
              ) : (
                <Button
                  onClick={generateLink}
                  variant="ghost"
                  colorScheme="blue"
                >
                  {hasCopied ? "Copied" : "Generate Link"}
                </Button>
              )}
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default InviteButton;
