import {
  Flex,
  Container,
  Text,
  HStack,
  Spacer,
  useColorModeValue,
  Stack,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Icon,
  useDisclosure,
  Collapse,
  Link,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import SignInButton from "./SignInButton";
import { useSession } from "next-auth/react";
import ScoutIcon from "../../core/Icons/ScoutIcon";
import ThemeButton from "./ThemeButton";
import MobileSignInButton from "./MobileSignInButton";
import MobileButton from "./MobileButton";
import AvatarMenu from "./AvatarMenu";

const NavigationBar: React.FC = () => {
  const scrollPosition = useScrollPosition();
  const { isOpen, onToggle } = useDisclosure();
  const { status } = useSession();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderBottomWidth = useColorModeValue("none", "1px");
  const borderBottomColor = useColorModeValue("none", "gray.700");

  return (
    <>
      <Flex
        height="80px"
        width="full"
        position="fixed"
        zIndex="1100"
        bgColor={bgColor}
        boxShadow={scrollPosition > 0 ? "sm" : "none"}
        borderBottomWidth={borderBottomWidth}
        borderBottomColor={borderBottomColor}
      >
        <Container maxW={{ xl: "8xl" }} px="0px">
          <Flex px="4vw" align="center">
            <NextLink href="/" passHref>
              <Stack
                direction={"row"}
                spacing={4}
                align={"center"}
                cursor="pointer"
              >
                <ScoutIcon width={96} height={80} />
              </Stack>
            </NextLink>
            <Flex display={{ base: "none", lg: "flex" }} ml={"32px"} mt={"8px"}>
              <DesktopNav />
            </Flex>
            <Spacer />
            <HStack spacing={"16px"} height={"80px"} alignItems={"center"}>
              <ThemeButton />
              {status === "unauthenticated" ? <SignInButton /> : <AvatarMenu />}
              <MobileButton onToggle={onToggle} isOpen={isOpen} />
            </HStack>
          </Flex>
        </Container>
      </Flex>
      <Flex
        position={"fixed"}
        margin={0}
        top={"80px"}
        width={"100%"}
        bgColor={"white"}
        zIndex={1100}
      >
        <Box as={Collapse} in={isOpen} width={"100%"}>
          <MobileNav />
          <MobileSignInButton />
        </Box>
      </Flex>
    </>
  );
};

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", updatePosition);

    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={0} ml={4} align={"center"}>
      {NAV_ITEMS.map((navItem) => {
        return (
          <Box key={navItem.label}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <NextLink href={navItem.href ? navItem.href : "#"} passHref>
                <Link
                  style={{ textDecoration: "none" }}
                  target={navItem.isExternal ? "_blank" : null}
                >
                  <PopoverTrigger>
                    <Flex
                      cursor={"pointer"}
                      p={4}
                      color={linkColor}
                      _hover={{
                        color: linkHoverColor,
                      }}
                    >
                      <Text fontSize="lg" fontWeight="semibold">
                        {navItem.label}
                      </Text>
                      {navItem.children && (
                        <Flex px={1} alignItems={"center"}>
                          <Icon
                            color={linkColor}
                            w={5}
                            h={5}
                            as={ChevronDownIcon}
                          />
                        </Flex>
                      )}
                    </Flex>
                  </PopoverTrigger>
                </Link>
              </NextLink>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  top={"-16px"}
                  rounded={"xl"}
                  minW={"sm"}
                >
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

const DesktopSubNav = ({ label, href, subLabel, isExternal }: NavItem) => {
  return (
    <NextLink href={href} target={isExternal ? "_blank" : null} passHref>
      <Box
        cursor={"pointer"}
        role={"group"}
        p={2}
        rounded={"md"}
        _hover={{ bg: useColorModeValue("teal.50", "teal.700") }}
      >
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              _groupHover={{ color: useColorModeValue("teal.700", "white") }}
              fontWeight="medium"
            >
              {label}
            </Text>
            <Text fontSize={"sm"}>{subLabel}</Text>
          </Box>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{
              opacity: "100%",
              transform: "translateX(0)",
            }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon
              color={useColorModeValue("teal.700", "white")}
              w={5}
              h={5}
              as={ChevronRightIcon}
            />
          </Flex>
        </Stack>
      </Box>
    </NextLink>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      py={2}
      px={"4vw"}
      display={{ lg: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, isExternal }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  const color = useColorModeValue("teal.600", "teal.300");
  const bgColor = useColorModeValue("white", "gray.800");
  const popoverContentBgColor = useColorModeValue("gray.50", "gray.700");

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        p={2}
        justify={"space-between"}
        align={"center"}
        cursor={"pointer"}
        rounded={"base"}
        bg={isOpen ? popoverContentBgColor : bgColor}
        _hover={{
          bg: popoverContentBgColor,
        }}
      >
        <Button
          as="a"
          variant="link"
          href={href}
          target={isExternal ? "_blank" : null}
          fontWeight="semibold"
          fontSize={"lg"}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Button>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} style={{ marginTop: "8px" }}>
        <Stack
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <NextLink href={child.href} passHref key={child.label}>
                <Flex
                  width={"100%"}
                  cursor={"pointer"}
                  key={child.label}
                  py={2}
                  role="group"
                >
                  <Text
                    transition={"all .3s ease"}
                    _groupHover={{ color: color }}
                    fontWeight="normal"
                  >
                    {child.label}
                  </Text>
                </Flex>
              </NextLink>
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
  isExternal?: boolean;
}

const BETA_FEEDBACK_LINK = "https://forms.gle/sHALP5znkgQnyQ3U8";

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Discover",
    children: [
      {
        label: "Competitions",
        subLabel: "Hackathons, case competitions, etc.",
        href: "/competitions",
      },
    ],
  },
  {
    label: "Contact Us",
    href: BETA_FEEDBACK_LINK,
    isExternal: true,
  },
];

export default NavigationBar;
