import {
  Avatar,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ImProfile } from "react-icons/im";
import { AiOutlineTeam } from "react-icons/ai";
const AvatarMenu = () => {
  const { data: session } = useSession();
  const avatarImage = session.user.image;
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"ghost"}
        cursor={"pointer"}
        p="0px"
      >
        <Avatar size={"sm"} name={session.user.email} src={avatarImage} />
      </MenuButton>
      <MenuList width={"320px"} boxShadow={"2xl"}>
        <Stack spacing={4} py={4}>
          <Center>
            <Avatar size={"xl"} name={session.user.email} src={avatarImage} />
          </Center>
          <Stack>
            {session.user.name !== "" && (
              <Center>
                <Text fontSize={"xl"} fontWeight="semibold">
                  {session.user.name}
                </Text>
              </Center>
            )}
            <Center>
              <Text fontSize={"md"} fontWeight="normal">
                {session.user.email}
              </Text>
            </Center>
          </Stack>
        </Stack>
        <MenuDivider />
        <Link href="/profile">
          <MenuItem><ImProfile style={{marginLeft: "8px"}} /><Text ml="8px">Profile</Text></MenuItem>
        </Link>
        <Link href="/requests">
          <MenuItem><AiOutlineTeam style={{marginLeft: "8px"}} /><Text ml="8px">My Requests</Text></MenuItem>
        </Link>
        <MenuDivider />
        <Center py={2}>
            <Button width="120px" variant='outline' onClick={() => signOut()}>Sign out</Button>
        </Center>
      </MenuList>
    </Menu>
  );
};

export default AvatarMenu;
