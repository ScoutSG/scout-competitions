import { useState, useEffect } from "react";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";

import { Stack, ScaleFade } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useUserDetails } from "../../lib/hooks/useUserDetails";

import Head from "next/head";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const { setUserDetails } = useUserDetails();
  const session = useSession();

  useEffect(() => {
    if (!session.data) {
      return;
    }
    setUserDetails(session.data.user);
  }, [session]);

  return (
    <Stack minH="100vh" align="center">
      <Head>
        <title>Scout</title>
      </Head>
      <NavigationBar />
      <Stack
        pt={"70px"}
        spacing={0}
        pb={{ base: "200px", md: "100px" }}
        w="100%"
      >
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
