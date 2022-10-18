import { useEffect } from "react";
import { Stack, ScaleFade } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

import clientApi from "../../core/api/client";
import { useDraftRequest } from "../../lib/hooks/useDraftRequest";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import { useCustomToast } from "../../lib/hooks/useCustomToast";
import { useDraftGroup } from "../../lib/hooks/useDraftGroup";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const session = useSession();
  const router = useRouter();
  const { draftRequest, setDraftRequest } = useDraftRequest();
  const { draftGroup, setDraftGroup } = useDraftGroup();
  const { presentToast } = useCustomToast();

  useEffect(() => {
    if (draftRequest !== null && session.status === "authenticated") {
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

  useEffect(() => {
    if (draftGroup !== null && session.status === "authenticated") {
      const body = {
        ...draftGroup,
        members: [session.data.user.id],
      };
      clientApi.post("/groups", body).then((response) => {
        const group_id = response.data.id;
        setDraftGroup(null);
        router.push(
          `/competitions/${draftGroup.competitionId}/groups/${group_id}`
        );
        presentToast({
          title: "Created group!",
          status: "success",
          position: "top",
        });
      });
    }
  }, [draftGroup, session]);

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
