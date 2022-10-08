import React from "react";
import { Container } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";
import Footer from "../frontend/components/Footer";
import CallToAction from "../frontend/components/CallToAction";

const Page: React.FC = () => {
  return (
    <>
      <NavigationBar />
      <CallToAction />
      <Footer />
    </>
  );
};



export default Page;
