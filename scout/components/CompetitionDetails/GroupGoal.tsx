import { Wrap, Tag, TagLeftIcon, TagLabel, Text } from "@chakra-ui/react";
import { AiFillTrophy } from "react-icons/ai";
import { FaRegLightbulb } from "react-icons/fa";
import { TbMoodHappy, TbUsers } from "react-icons/tb";

const GroupMember = ({ goal }: { goal: String }) => {
  if (!goal) return;

  let colorScheme = "orange";
  let icon = AiFillTrophy;
  switch (goal) {
    case "Here to win":
      colorScheme = "orange";
      icon = AiFillTrophy;
      break;
    case "Here to have fun":
      colorScheme = "yellow";
      icon = TbMoodHappy;
      break;
    case "Here to make friends":
      colorScheme = "purple";
      icon = TbUsers;
      break;
    case "Here to learn":
      colorScheme = "green";
      icon = FaRegLightbulb;
      break;
  }

  return (
    <Wrap pt={4}>
      <Text>We're here to ...</Text>
      <Tag colorScheme={colorScheme}>
        <TagLeftIcon as={icon} />
        <TagLabel>{goal.replace("Here to ", "")}</TagLabel>
      </Tag>
    </Wrap>
  );
};

export default GroupMember;
