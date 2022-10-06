import React from "react";
import { Container, Button } from "@chakra-ui/react";
import NavigationBar from "../components/NavBar";
import Footer from "../frontend/components/Footer";
import CallToAction from "../frontend/components/CallToAction";
import PageContainer from "../frontend/components/PageContainer";

const Page: React.FC = () => {
  return (
    <>
      <PageContainer>
        <CallToAction />
      </PageContainer>
    </>
  );
};

export default Page;
