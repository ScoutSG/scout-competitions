import { useState, useEffect } from "react";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";

import { Stack, ScaleFade } from "@chakra-ui/react";

import Head from "next/head";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <Stack minH="100vh" align="center">
      <Head>
        <title>Scout</title>
      </Head>
      <NavigationBar />
      <Stack pt={"80px"} pb={{ base: "200px", md: "100px" }} w="100%">
        <Stack spacing={0}>
          <ScaleFade in={true} initialScale={0.9}>
            {children}
          </ScaleFade>
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default PageContainer;
