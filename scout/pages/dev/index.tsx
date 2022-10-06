import Navigation from "../../frontend/components/Navigation";
import Competition from "../../frontend/components/Competition/Detail";
import NavigationBar from "../../components/NavBar";
import CallToAction from "../../frontend/components/CallToAction";
import CompetitionDiscovery from "../../frontend/components/Competition/Discover";
import SimpleThreeColumns from "../../frontend/components/Home/Steps";
import Footer from "../../frontend/components/Footer";

import PageContainer from "../../frontend/components/PageContainer";

import { Container } from "@chakra-ui/react";

const Page: React.FC = () => {
  return (
    <>
      <PageContainer>
        <SimpleThreeColumns />
      </PageContainer>
      {/* <Container maxW={"7xl"}> */}
      {/* <CallToAction /> */}
      {/* <Competition />
        <CompetitionDiscovery /> */}

      {/* 
        <LoginPage /> */}
      {/* </Container>
      <Footer /> */}
    </>
  );
};

export default Page;
