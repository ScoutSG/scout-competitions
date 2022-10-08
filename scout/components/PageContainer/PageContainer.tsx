import { useState, useEffect } from "react";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";

import { Stack, Container, Fade, ScaleFade } from "@chakra-ui/react";
import { ReactNode } from "react-markdown/lib/react-markdown";

import Head from "next/head";

interface PageContainerProps {
  children: ReactNode;
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
