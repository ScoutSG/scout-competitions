import { Container } from "@chakra-ui/react";

import NavigationBar from "../NavigationBar";
import Footer from "../Footer";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <>
      <Container minH="100vh" width="100vw" maxWidth="100%" padding="0px">
        <NavigationBar />
        <Container
          maxW={{ xl: "8xl" }}
          px="4vw"
          pt="80px"
          pb={{ base: "104px", md: "64px" }}
        >
          {children}
        </Container>
        <Footer />
      </Container>
    </>
  );
};

export default PageContainer;
