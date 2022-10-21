import { Wrap, Tag, TagLeftIcon, TagLabel, Text } from "@chakra-ui/react";
import { AiFillTrophy } from "react-icons/ai";
import { IoMdBuild } from "react-icons/io";
import { FaRegLightbulb } from "react-icons/fa";

const GroupMember = ({ goal }: { goal: String }) => {
  let colorScheme = "orange";
  let icon = AiFillTrophy;
  switch (goal) {
    case "Win the competition":
      colorScheme = "orange";
      icon = AiFillTrophy;
      break;
    case "Gain new skills":
      colorScheme = "purple";
      icon = IoMdBuild;
      break;
    case "Try something new":
      colorScheme = "green";
      icon = FaRegLightbulb;
      break;
  }

  return (
    <Wrap>
      <Text>We're here to ...</Text>
      <Tag colorScheme={colorScheme}>
        <TagLeftIcon as={icon} />
        <TagLabel>{goal}</TagLabel>
      </Tag>
    </Wrap>
  );
};

export default GroupMember;
