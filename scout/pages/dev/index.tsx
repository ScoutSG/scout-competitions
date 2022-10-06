// import LoginPage from "../../frontend/components/Login";
import Navigation from "../../frontend/components/Navigation";
import Competition from "../../frontend/components/Competition/Detail";
import NavigationBar from "../../components/NavBar";
import CallToAction from "../../frontend/components/CallToAction";
import CompetitionDiscovery from "../../frontend/components/Competition/Discover";
import SimpleThreeColumns from "../../frontend/components/Home/Steps";
import Footer from "../../frontend/components/Footer";

import { Container } from "@chakra-ui/react";

const Page: React.FC = () => {
  return (
    <>
      <Container maxW={"7xl"}>
        <NavigationBar />

        <SimpleThreeColumns />

        {/* <CallToAction /> */}
        {/* <Competition />
        <CompetitionDiscovery /> */}

        {/* 
        <LoginPage /> */}
      </Container>
      <Footer />
    </>
  );
};

export default Page;
