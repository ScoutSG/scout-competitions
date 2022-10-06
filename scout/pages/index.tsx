import React from "react";
import { Container } from "@chakra-ui/react";
import NavigationBar from "../components/NavBar";
import Footer from "../frontend/components/Footer";
import CallToAction from "../frontend/components/CallToAction";

const Page: React.FC = () => {
  return (
    <>
      <Container maxW={"7xl"}>
        <NavigationBar />
        <CallToAction />
      </Container>
      <Footer />
    </>
  );
};

export default Page;
