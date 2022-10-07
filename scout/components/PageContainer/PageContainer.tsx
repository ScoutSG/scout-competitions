import NavigationBar from "../NavBar";
import Footer from "../Footer";

import { Container, Flex, Stack, Box } from "@chakra-ui/react";
import { ReactNode } from "react-markdown/lib/react-markdown";
import Head from "next/head";

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Scout</title>
      </Head>
      <Container maxW={"8xl"} minH="85vh">
        <NavigationBar />
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default PageContainer;
