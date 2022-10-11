import { useEffect } from "react";
import { Stack, ScaleFade } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

import clientApi from "../../core/api/client";
import { useUserDetails } from "../../lib/hooks/useUserDetails";
import { useDraftRequest } from "../../lib/hooks/useDraftRequest";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import { useCustomToast } from "../../lib/hooks/useCustomToast";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const { setUserDetails } = useUserDetails();
  const session = useSession();
  const router = useRouter();
  const { draftRequest, setDraftRequest } = useDraftRequest();
  const { presentToast } = useCustomToast();

  useEffect(() => {
    if (!session.data) {
      return;
    }
    setUserDetails(session.data.user);
  }, [session]);

  useEffect(() => {
    if (draftRequest && session.status === "authenticated") {
      const body = {
        ...draftRequest,
        userId: session.data.user.id,
      };
      clientApi.post("/applications", body);
      setDraftRequest(null);
      router.push("/requests");
      presentToast({
        title: "Sent your request to the team!",
        status: "success",
        position: "top",
      });
    }
  }, [draftRequest, session]);

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
