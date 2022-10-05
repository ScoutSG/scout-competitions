import LoginPage from "../components/Login";
import Navigation from "../components/Navigation";
import Competition from "../components/Competition/Detail";
import NavigationBar from "../components/NavigationBar";
import CallToAction from "../components/CallToAction";

import { Container } from "@chakra-ui/react";

const Page: React.FC = () => {
  return (
    <>
      <Container maxW={"7xl"}>
        <NavigationBar />
        <CallToAction />
        <LoginPage />
      </Container>
    </>
  );
};

export default Page;
