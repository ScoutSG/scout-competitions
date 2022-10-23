import {
  Badge,
  Button,
  Stack,
  Text,
  Avatar,
  Wrap,
  WrapItem,
  useMediaQuery,
  IconButton,
} from "@chakra-ui/react";

import { useCustomClipboard } from "../../lib/hooks/useCustomClipboard";
import { useIsLargerThanMd } from "../../lib/hooks/useIsLargerThanMd";
import useAnalyticsTracker from "../../lib/hooks/useAnalyticsTracker";
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbMail,
  TbBrandTelegram,
  TbCopy,
} from "react-icons/tb";

const MemberCard = ({ member, isSmall = false }) => {
  // 48em is the default breakpoint for width size = md
  const isLargerThanMd = useIsLargerThanMd();
  const eventAnalyticsTracker = useAnalyticsTracker(
    "Member Card " + member.name
  );

  const mapFieldToIcon = {
    email: <TbMail />,
    telegramUrl: <TbBrandTelegram />,
    linkedinUrl: <TbBrandLinkedin />,
    gitHubUrl: <TbBrandGithub />,
  };

  const mapFieldToClipboard = {
    email: useCustomClipboard(member.email),
    telegramUrl: useCustomClipboard(member.telegramUrl),
    linkedinUrl: useCustomClipboard(member.linkedinUrl),
    gitHubUrl: useCustomClipboard(member.gitHubUrl),
  };

  const copyContactDetail = async (attr) => {
    mapFieldToClipboard[attr].onCopy();
    await eventAnalyticsTracker(`Copy ${attr} from ${member.name}`);
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
      {isSmall ? null : (
        <Avatar src={member.image ? member.image : member.email.charAt(0)} />
      )}
      <Stack spacing={2} w="full">
        <Text fontWeight="bold" fontSize="xl">
          {member.name ? member.name : "Anonymous"}
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
                        onClick={() => copyContactDetail(attribute[0])}
                      />
                    ) : (
                      <Button
                        leftIcon={mapFieldToIcon[attribute[0]]}
                        onClick={() => copyContactDetail(attribute[0])}
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
