import {
  Badge,
  Button,
  Stack,
  Text,
  ButtonGroup,
  Avatar,
  useClipboard,
} from "@chakra-ui/react";

import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbMail,
  TbBrandTelegram,
} from "react-icons/tb";

const MemberCard = ({ member }) => {
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
      px={4}
      py={2}
    >
      <Avatar src={member.image ? member.image : member.email.charAt(0)} />
      <Stack spacing={1}>
        <Text fontWeight="bold" fontSize="xl">
          {member.name}
        </Text>
        <Badge w="fit-content" px={2}>
          {member.major}
        </Badge>
        <Badge w="fit-content" px={2}>
          {member.specialization}
        </Badge>

        <ButtonGroup
          variant="outline"
          flexDirection={{ base: "column", md: "row" }}
        >
          {Object.entries(member).map((attribute) => {
            if (attribute[0] in mapFieldToIcon && attribute[1]) {
              return (
                <Button
                  leftIcon={mapFieldToIcon[attribute[0]]}
                  onClick={mapFieldToClipboard[attribute[0]].copyToClipboard}
                >
                  {mapFieldToClipboard[attribute[0]].hasCopied
                    ? "Copied"
                    : (attribute[1] as string)}
                </Button>
              );
            } else {
              return null;
            }
          })}
        </ButtonGroup>
      </Stack>
    </Stack>
  );
};

export default MemberCard;
