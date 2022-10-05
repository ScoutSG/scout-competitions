import { Flex, Input, Button, Box } from "@chakra-ui/react";
import styles from "./index.module.scss";
import ScoutsIcon from "../ScoutsIcon";

const LoginPage: React.FC = () => {
  return (
    <Flex className={styles.container}>
      <Flex className={styles.container__content} boxShadow="lg">
        <Box justifyContent="center" alignItems="center">
          <ScoutsIcon />
        </Box>
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
