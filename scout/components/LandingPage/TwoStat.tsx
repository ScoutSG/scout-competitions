import {
  Stack,
  useColorModeValue,
  Text,
  SimpleGrid,
  Icon,
  Box,
} from "@chakra-ui/react";
import { TbBrandTelegram, TbTemplate } from "react-icons/tb";

const TwoStat: React.FC = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }}>
      <Stack p={8} alignItems="center">
        <Icon as={TbBrandTelegram} color="#0088CC" w={16} h={16} />
        <Text
          fontWeight="bold"
          fontSize={{ base: "3xl", sm: "4xl" }}
          textAlign="center"
          color="#0088CC"
          minW="380px"
        >
          Telegram Integration
        </Text>
        <Box width={{ base: "100%", lg: "72%" }}>
          <Text
            textAlign="center"
            fontSize="xl"
            mt={4}
            fontWeight="medium"
            color={useColorModeValue("gray.500", "gray.400")}
          >
            Tired of manually creating group chats? Now you don't have to. Scout
            will create a Telegram group for your group and update the group if
            anyone requests to join!
          </Text>
        </Box>
      </Stack>

      <Stack p={8} alignItems="center">
        <Icon as={TbTemplate} color="#F4B400" w={16} h={16} />
        <Text
          fontWeight="bold"
          fontSize={{ base: "3xl", sm: "4xl" }}
          textAlign="center"
          color="#F4B400"
        >
          Template Questions
        </Text>
        <Box width={{ base: "100%", lg: "72%" }}>
          <Text
            textAlign="center"
            fontSize="xl"
            mt={4}
            fontWeight="medium"
            color={useColorModeValue("gray.500", "gray.400")}
          >
            Not sure what to ask? We've got you covered! Our template questions are adapted from Google's research on what drives effective teams.
          </Text>
        </Box>
      </Stack>
    </SimpleGrid>
  );
};

export default TwoStat;
