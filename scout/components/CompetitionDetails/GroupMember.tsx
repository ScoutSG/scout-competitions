import {
  Avatar,
  Badge,
  Wrap,
  Tag,
  TagLeftIcon,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { FaSchool } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import { Member } from "../../core/types/Group";

const GroupMember = ({ member, role }: { member: Member; role: String }) => {
  return (
    <Wrap spacing={{ base: 2, md: 4 }} align="center">
      <Avatar name={member.name} src={member.image} size="sm" />
      <Text>{member.name}</Text>
      {role && <Badge colorScheme="red">{role}</Badge>}
      <Wrap spacing={{ base: 2, md: 4 }}>
        {member.school && (
          <Tag>
            <TagLeftIcon as={FaSchool} />
            <TagLabel>{member.school}</TagLabel>
          </Tag>
        )}
        {member.yearOfStudy && member.major && (
          <Tag>
            <TagLeftIcon as={IoIosSchool} />
            <TagLabel>{`Y${member.yearOfStudy} ${member.major}`}</TagLabel>
          </Tag>
        )}
      </Wrap>
    </Wrap>
  );
};

export default GroupMember;
