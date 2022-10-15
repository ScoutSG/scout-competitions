import {
  Badge,
  Button,
  Stack,
  Text,
  Avatar,
  Wrap,
  WrapItem,
  useClipboard,
  useMediaQuery,
  IconButton,
} from "@chakra-ui/react";

import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbMail,
  TbBrandTelegram,
  TbCopy,
} from "react-icons/tb";

const MemberCard = ({ member }) => {
  // 48em is the default breakpoint for width size = md
  const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");

  const clipboard = (value) => {
    const { hasCopied, onCopy } = useClipboard(value, 500);

    return { copyToClipboard: onCopy, hasCopied: hasCopied };
  };

  const mapFieldToIcon = {
    email: <TbMail />,
    telegramUrl: <TbBrandTelegram />,
    linkedinUrl: <TbBrandLinkedin />,
    gitHubUrl: <TbBrandGithub />,
  };

  const mapFieldToClipboard = {
    email: clipboard(member.email),
    telegramUrl: clipboard(member.telegramUrl),
    linkedinUrl: clipboard(member.linkedinUrl),
    gitHubUrl: clipboard(member.gitHubUrl),
  };

  return (
    <Stack
      direction={"row"}
      align="center"
      spacing={10}
      rounded={"md"}
      px={{ base: 1, md: 4 }}
      py={2}
      w="100%"
    >
      <Avatar src={member.image ? member.image : member.email.charAt(0)} />
      <Stack spacing={2} w="full">
        <Text fontWeight="bold" fontSize="xl">
          {member.name}
        </Text>
        <Stack direction={{ base: "column", md: "row" }} spacing={1}>
          {member.major ? (
            <Badge w="fit-content" px={2}>
              {member.major}
            </Badge>
          ) : null}
          {member.specialisation ? (
            <Badge w="fit-content" px={2}>
              {member.specialisation}
            </Badge>
          ) : null}
        </Stack>

        <Stack spacing={1}>
          <Text fontWeight="semibold">Contact</Text>
          <Wrap spacing={0.5}>
            {Object.entries(member).map((attribute) => {
              if (attribute[0] in mapFieldToIcon && attribute[1]) {
                return (
                  <WrapItem w={{ base: "fit-content", md: "fit-content" }}>
                    {!isLargerThanMd ? (
                      <IconButton
                        aria-label={"icon-" + attribute[0]}
                        icon={
                          mapFieldToClipboard[attribute[0]].hasCopied ? (
                            <TbCopy />
                          ) : (
                            mapFieldToIcon[attribute[0]]
                          )
                        }
                        bgColor={
                          mapFieldToClipboard[attribute[0]].hasCopied
                            ? "gray.200"
                            : "transparent"
                        }
                        variant="outline"
                        onClick={
                          mapFieldToClipboard[attribute[0]].copyToClipboard
                        }
                      />
                    ) : (
                      <Button
                        leftIcon={mapFieldToIcon[attribute[0]]}
                        onClick={
                          mapFieldToClipboard[attribute[0]].copyToClipboard
                        }
                        fontWeight="normal"
                        variant="outline"
                      >
                        {mapFieldToClipboard[attribute[0]].hasCopied
                          ? "Copied"
                          : (attribute[1] as string)}
                      </Button>
                    )}
                  </WrapItem>
                );
              } else {
                return null;
              }
            })}
          </Wrap>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MemberCard;
