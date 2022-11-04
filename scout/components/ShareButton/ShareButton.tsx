import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ButtonGroup,
  Button,
  Center,
} from "@chakra-ui/react";
import { TbSend, TbShare, TbBrandTelegram, TbCopy } from "react-icons/tb";
import { useRouter } from "next/router";
import { useQRCode } from "next-qrcode";
import { useUrlClipboard } from "../../lib/hooks/useCustomClipboard";
import useAnalyticsTracker from "../../lib/hooks/useAnalyticsTracker";

const ShareButton = ({ group }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { Canvas } = useQRCode();
  const groupLink = `/competitions/${router.query.competitionId}/groups/${group.id}`;
  const clipboard = useUrlClipboard(groupLink);
  const eventAnalyticsTracker = useAnalyticsTracker("Share " + group.name);

  const shareViaTelegram = async () => {
    const message = `My team, ${group.name}, is participating in a competition!\n\n Join us!`;
    const link = encodeURIComponent(window.location.origin + groupLink);

    window.open(
      "https://t.me/share/url?url=" + link + "&text=" + `\n ${message}`,
      "_blank"
    );

    await eventAnalyticsTracker("Share via Telegram");
  };

  const copyLink = async () => {
    clipboard.onCopy();
    await eventAnalyticsTracker("Copy Link");
  };

  return (
    <>
      <Button
        leftIcon={<TbShare />}
        variant="solid"
        colorScheme="gray"
        onClick={onOpen}
        w="fit-content"
      >
        Share
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Share {group.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Share this link so that your peers can submit a request to your
              team!
            </ModalBody>
            <ModalBody>
              <Center>
                <Canvas
                  text={
                    (typeof window !== "undefined" && window.location.origin
                      ? window.location.origin
                      : "") + groupLink
                  }
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
            </ModalBody>
            <ModalFooter>
              <ButtonGroup>
                <Button
                  colorScheme="telegram"
                  leftIcon={<TbBrandTelegram />}
                  onClick={shareViaTelegram}
                >
                  Telegram
                </Button>
                <Button leftIcon={<TbCopy />} onClick={copyLink}>
                  {clipboard.hasCopied ? "Copied" : "Copy Link"}
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default ShareButton;
