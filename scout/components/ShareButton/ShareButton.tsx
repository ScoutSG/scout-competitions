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

const ShareButton = ({ group }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { Canvas } = useQRCode();
  const groupLink = `/competitions/${router.query.competitionId}/groups/${group.id}`;
  const clipboard = useUrlClipboard(groupLink);

  const shareViaTelegram = () => {
    const message = `My team, ${group.name}, is participating in a competition!\n\n Join us!`;
    const link = encodeURIComponent(window.location.origin + groupLink);

    window.open(
      "https://t.me/share/url?url=" + link + "&text=" + `\n ${message}`,
      "_blank"
    );
  };

  return (
    <>
      <Button
        leftIcon={<TbShare />}
        variant="solid"
        color="white"
        bgColor="primary.500"
        _hover={{ color: "primary.500", bgColor: "transparent" }}
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
    </>
  );
};

export default ShareButton;
