import {
  chakra,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Box,
  Container,
} from "@chakra-ui/react";
import {
  TbBrandGithub,
  TbBrandInstagram,
  TbBrandLinkedin,
} from "react-icons/tb";
import { ReactNode } from "react";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      rounded={"md"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Footer: React.FC = () => {
  return (
    <Box position="absolute" bottom="0" w="100%">
      <Container maxW={{ xl: "8xl" }} px="0px">
        <Stack
          py={4}
          px="4vw"
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
          bg={useColorModeValue("transparent", "gray.800")}
          color={useColorModeValue("gray.700", "gray.200")}
        >
          <Text>© Scout SG 2022. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton
              label={"Instagram"}
              href={"https://www.instagram.com/scoutteamsg/"}
            >
              <TbBrandInstagram />
            </SocialButton>
            <SocialButton
              label={"LinkedIn"}
              href={"https://www.linkedin.com/company/scoutsg/"}
            >
              <TbBrandLinkedin />
            </SocialButton>
            <SocialButton label={"GitHub"} href={"#"}>
              <TbBrandGithub />
            </SocialButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
