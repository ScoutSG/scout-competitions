import { Flex, Heading, Input, Button } from "@chakra-ui/react";
import styles from "./index.module.scss";

const LoginPage: React.FC = () => {
  return (
    <Flex className={styles.container}>
      <Flex className={styles.container__content} boxShadow="lg">
        <Heading mb={6}>Logo</Heading>
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
