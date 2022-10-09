import NavigationBar from "../../components/NavigationBar";

import { Container } from "@chakra-ui/react";

const Page: React.FC = () => {
  return (
    <>
      <Container maxW={"7xl"}>
        <NavigationBar />

        {/*<SimpleThreeColumns />*/}

        {/* <CallToAction /> */}
        {/* <Competition />
        <CompetitionDiscovery /> */}

        {/* 
        <LoginPage /> */}
      </Container>
      {/*<Footer />*/}
    </>
  );
};

export default Page;
