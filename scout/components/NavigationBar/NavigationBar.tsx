import '@fontsource/open-sans/800.css'

import {
  Flex,
  Container,
  Image,
  Text,
  HStack,
  Spacer,
  Button,
  useColorMode,
  useColorModeValue,
  Stack,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Icon,
  IconButton,
  useDisclosure,
  Collapse,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem
} from "@chakra-ui/react";
import Link from "next/link";
import { ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { MouseEventHandler } from 'react';
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const NavigationBar: React.FC = () => {
  const {data: session, status } = useSession();
  const { isOpen, onToggle } = useDisclosure();

  return(
    <>
      <Flex width={"100%"} position={"fixed"} as={"header"} zIndex={"1100"}>
        <Container maxW={{xl: "8xl"}} px={"0px"}>
          <Flex height={"80px"} px={"4vw"}>
            <Logo />
            <Flex display={{ base: 'none', lg: 'flex' }} ml={"32px"} mt={"8px"}>
              <DesktopNav />
            </Flex>
            <Spacer />
            <HStack spacing={"16px"} height={"80px"} alignItems={"center"}>
              <ThemeButton />
              {status != "authenticated" && <SignIn />}
              {status === "authenticated" && <AvatarMenu name={session.user.name} email={session.user.email} image={session.user.image} />}
              <MobileButton onToggle={onToggle} isOpen={isOpen} />
            </HStack>
          </Flex>
        </Container>
      </Flex>
      <Flex position={"fixed"} top={"80px"} width={"100%"} bgColor={"white"} zIndex={1100}>
        <Box as={Collapse} in={isOpen} width={"100%"}>
          <MobileNav />
          <MobileSignIn />
        </Box>
      </Flex>
    </>
  );
};

const Logo = () => {
  const color = useColorModeValue("red.500", "red.400");
  const { colorMode } = useColorMode();

  return (
    <Link href="/">
      <HStack spacing={"16px"} cursor={"pointer"} height={"80px"} minW={"32px"} alignItems={"center"}>
        <Image src={colorMode === "light" ? "/logo.svg": "/logoDark.svg"} width={"32px"} height={"40px"} />
        <Text fontFamily={"Open Sans"} fontSize={"3xl"} color={color}>
          Scout
        </Text>
      </HStack>
    </Link>
  );
}

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} variant={"ghost"}>
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}

const SignIn = () => {
  const color = useColorModeValue("red.500", "red.400");
  return (
    <Link href="/auth/signin">
        <Button display={{base: "none", lg: "flex"}} color={color} borderColor={color} variant="outline" size="md">
            Find your team
        </Button>
    </Link>
  );
}

const MobileSignIn = () => {
  const color = useColorModeValue("red.500", "red.400");
  return (
    <Link href="/auth/signin">
        <Flex width={"100%"} px={"4vw"} mt={"16px"} display={{lg: "none"}} pb="40px">
          <Button width={"100%"} color={color} borderColor={color} variant="outline" size="md">
              Find your team
          </Button>
        </Flex>
    </Link>
  );
}

const MobileButton = (props: { onToggle: MouseEventHandler<HTMLButtonElement>; isOpen: any; }) => {
  return (
    <Flex
      flex={{ base: 1, md: 'auto' }}
      ml={{ base: -2 }}
      display={{ base: 'flex', lg: 'none' }}>
      <IconButton
        onClick={props.onToggle}
        icon={
          props.isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
        }
        variant={'ghost'}
        aria-label={'Toggle Navigation'}
      />
    </Flex>
  );
}

const AvatarMenu = (props) => {
  const initial = props.email.charAt(0)
  const avatarImage = 
    props.image !== "" 
    ? props.image
    : `https://ui-avatars.com/api/?name=${initial}`
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={'full'}
        variant={'link'}
        cursor={'pointer'}>
        <Avatar
          size={'sm'}
          src={avatarImage}
        />
      </MenuButton>
      <MenuList width={"320px"} boxShadow={"2xl"}>
        <Stack spacing={4} py={4}>
          <Center>
            <Avatar
              size={'xl'}
              src={avatarImage}
            />
          </Center>
          <Stack>
            {props.name !== "" && 
              <Center>
                <Text fontSize={"xl"} fontWeight={500}>
                  {props.name}
                </Text>
              </Center>
            }
            <Center>
              <Text fontSize={"md"} fontWeight={400}>
                {props.email}
              </Text>
            </Center>
          </Stack>
        </Stack>
        <MenuDivider />
        <Link href="/profile">
          <MenuItem>Profile</MenuItem>
        </Link>
        <MenuItem>Requests</MenuItem>
        <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
      </MenuList>
    </Menu>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4} alignItems={"center"}>
      {NAV_ITEMS.map((navItem) => {
        return (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
            <Link href={navItem.href ?? '#'}>
              <PopoverTrigger>
                  <Flex
                    cursor={"pointer"}
                    p={4}
                    fontSize={'lg'}
                    fontWeight={600}
                    color={linkColor}
                    _hover={{
                      color: linkHoverColor,
                    }}>
                    {navItem.label}
                    {navItem.children &&(
                      <Flex
                        px={1}
                        alignItems={"center"}
                      >
                        <Icon color={linkColor} w={5} h={5} as={ChevronDownIcon} />
                      </Flex>
                    )}
                  </Flex>
              </PopoverTrigger>
            </Link>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  top={"-16px"}
                  rounded={'xl'}
                  minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        );
      })}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link href={href}>
      <Box
        cursor={"pointer"}
        role={'group'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('red.50', 'gray.900') }}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'red.400' }}
              fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}>
            <Icon color={'red.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Box>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      py={2}
      mx={"4vw"}
      display={{ lg: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const popoverContentBgColor = useColorModeValue('gray.50', 'gray.700');

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        p={2}
        justify={'space-between'}
        align={'center'}
        cursor={"pointer"}
        rounded={"base"}
        bg={isOpen ? popoverContentBgColor : bgColor}
        _hover={{
          bg: popoverContentBgColor
        }}>
        <Text
          fontWeight={500}
          fontSize={"lg"}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '8px' }}>
        <Stack
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link href={child.href} key={child.label}>
                <Flex width={"100%"} cursor={"pointer"} key={child.label} py={2} role="group">
                  <Text
                    transition={'all .3s ease'}
                    _groupHover={{ color: 'red.400' }}
                    fontWeight={400}>
                    {child.label}
                  </Text>
                </Flex>
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Discover",
    children: [
      {
        label: "Competitions",
        subLabel: "Hackathons, case competitions, etc.",
        href: "/competitions",
      }
    ],
  }
];

export default NavigationBar;