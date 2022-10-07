import {
  chakra,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { ReactNode } from "react";
import ScoutIcon from "../../core/Icons/ScoutIcon";

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
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
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
    <Stack
      p={4}
      direction={{ base: "column", md: "row" }}
      spacing={2}
      h={"full"}
      justify={{ base: "center", md: "space-between" }}
      align={{ base: "center", md: "center" }}
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      minH="15vh"
    >
      <ScoutIcon />
      <Text>© Scout SG 2022. All rights reserved</Text>
      <Stack direction={"row"} spacing={6}>
        <SocialButton label={"Instagram"} href={"#"}>
          <FaInstagram />
        </SocialButton>
        <SocialButton label={"LinkedIn"} href={"#"}>
          <FaLinkedin />
        </SocialButton>
        <SocialButton label={"GitHub"} href={"#"}>
          <FaGithub />
        </SocialButton>
      </Stack>
    </Stack>
  );
};

export default Footer;
