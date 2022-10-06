import NavigationBar from "../../../components/NavBar";
import Footer from "../../../frontend/components/Footer";

import { Container, Flex, Stack, Box } from "@chakra-ui/react";
import { ReactNode } from "react-markdown/lib/react-markdown";

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <>
      <Container maxW={"7xl"} minH="85vh">
        <NavigationBar />
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default PageContainer;
