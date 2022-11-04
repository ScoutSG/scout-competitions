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
import clientApi from "../../core/api/client";
import { AxiosResponse } from "axios";
import { useCustomToast } from "../../lib/hooks/useCustomToast";
import useAnalyticsTracker from "../../lib/hooks/useAnalyticsTracker";
import { TbPlus } from "react-icons/tb";
import { useQRCode } from "next-qrcode";

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

  return { setCode, hasCopied, inviteLink };
};

const InviteButton = ({ group }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { presentToast } = useCustomToast();
  const { setCode, hasCopied, inviteLink } = useInvite();
  const eventAnalyticsTracker = useAnalyticsTracker("Invite " + group.name);
  const { Canvas } = useQRCode();

  const generateLink = async () => {
    setIsLoading(true);
    const body = {
      groupId: group.id,
    };

    let response: AxiosResponse;

    try {
      response = await clientApi.post("/invitations", body);
    } catch (err) {
      presentToast({
        description: "Failed to generate link",
        status: "error",
      });
    } finally {
      if (response && response.data) {
        setCode(response.data.code);
      }
    }
    await eventAnalyticsTracker("Generate Invite Link for " + group.name);
    setIsLoading(false);
  };
  return (
    <>
      <Button
        leftIcon={<TbPlus />}
        variant="solid"
        colorScheme="blue"
        onClick={onOpen}
        w="fit-content"
      >
        Add Members
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Add Members</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Alert status="warning">
                <Stack direction="column">
                  <Stack direction="row">
                    <AlertIcon />
                    <AlertTitle>Important!</AlertTitle>
                  </Stack>
                  <AlertDescription>
                    This link allows the recipient to be added into the group
                    automatically. Use it to invite your friends to join your
                    team without going through the request and approval process.
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
                  <Center>
                    <Canvas
                      text={inviteLink}
                      options={{
                        type: "image/jpeg",
                        quality: 0.3,
                        level: "M",
                        margin: 3,
                        scale: 4,
                        width: 200,
                      }}
                    />
                  </Center>
                </Stack>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={generateLink}
                variant="ghost"
                colorScheme="blue"
                isLoading={isLoading}
              >
                {hasCopied ? "Copied" : "Generate Link"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default InviteButton;
