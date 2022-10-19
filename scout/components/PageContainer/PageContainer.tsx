import { useEffect } from "react";
import { Container } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

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
    <>
      <Container position="relative" minH="100vh" minW="100vw" padding="0px">
        <NavigationBar />
        <Container maxW={{ xl: "8xl" }} px="4vw" pt="80px" pb={{base: "104px", md: "64px"}}>
          {children}
        </Container>
        <Footer />
      </Container>
    </>
  );
};

export default PageContainer;
