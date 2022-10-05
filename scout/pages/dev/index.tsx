import LoginPage from "../../frontend/components/Login";
import Navigation from "../../frontend/components/Navigation";
import Competition from "../../frontend/components/Competition/Detail";
import NavigationBar from "../../frontend/components/NavigationBar";
import CallToAction from "../../frontend/components/CallToAction";
import CompetitionDiscovery from "../../frontend/components/Competition/Discover";

import { Container } from "@chakra-ui/react";

const Page: React.FC = () => {
  return (
    <>
      <Container maxW={"7xl"}>
        <NavigationBar />
        <CompetitionDiscovery />
        {/* <CallToAction />
        <LoginPage /> */}
      </Container>
    </>
  );
};

export default Page;
