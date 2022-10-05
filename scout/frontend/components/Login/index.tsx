import { Flex, Input, Button, Box } from "@chakra-ui/react";
import styles from "./index.module.scss";
import ScoutIcon from "../Icons/ScoutIcon";

const LoginPage: React.FC = () => {
  return (
    <Flex className={styles.container}>
      <Flex className={styles.container__content} boxShadow="lg">
        <Flex justify={{ base: "center" }} maxH="100px" mb={5}>
          <ScoutIcon />
        </Flex>
        <Input
          placeholder="johndoe@gmail.com"
          type="email"
          variant="filled"
          mb={3}
        />
        <Button mb={8} colorScheme="blue">
          Log In
        </Button>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
