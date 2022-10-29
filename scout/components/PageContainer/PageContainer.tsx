import { useEffect } from "react";
import { Container } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import clientApi from "../../core/api/client";
import { useDraftRequest } from "../../lib/hooks/useDraftRequest";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import { useCustomToast } from "../../lib/hooks/useCustomToast";
import { useDraftGroup, useDraftTelegram } from "../../lib/hooks/useDraftGroup";
import { useJoinRequest } from "../../lib/hooks/useJoinRequest";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const session = useSession();
  const router = useRouter();
  const { draftRequest, setDraftRequest } = useDraftRequest();
  const { draftGroup, setDraftGroup } = useDraftGroup();
  const { telegramUrlDraft, setTelegramUrlDraft } = useDraftTelegram();
  const { joinRequest, setJoinRequest } = useJoinRequest();
  const { presentToast } = useCustomToast();

  useEffect(() => {
    if (joinRequest !== null && session.status === "authenticated") {
      const body = {
        userId: session.data.user.id,
      };
      const code = joinRequest.id;
      clientApi
        .patch(`/invitations/${code}`, body)
        .then((res) => {
          setJoinRequest(null);
          let { competitionId, groupId } = res.data;
          router.replace(`/competitions/${competitionId}/groups/${groupId}`);
          // router.push(`/competitions/${competitionId}/groups/${groupId}`);
        })
        .catch((err) => {
          presentToast({
            position: "top",
            status: "error",
            title: "Unable to join group",
            description: err.response.data || err.response.statusText,
          });
          router.push("/");
        });
    }
  }, [joinRequest, session]);

  useEffect(() => {
    if (draftRequest !== null && session.status === "authenticated") {
      presentToast({
        description: "Loading your saved request",
        status: "info",
        position: "top",
      });

      const body = {
        ...draftRequest,
        userId: session.data.user.id,
      };

      const submitApplication = async () => {
        try {
          await clientApi.post("/applications", body);
          presentToast({
            description: "Request sent!",
            status: "success",
            position: "top",
          });
          router.push("/requests");
        } catch (err) {
          presentToast({
            title: "Failed to submit your request",
            position: "top",
            status: "error",
            description: err.response.statusText,
          });
        } finally {
          setDraftRequest(null);
        }
      };

      submitApplication();
    }
  }, [draftRequest, session]);

  useEffect(() => {
    if (draftGroup !== null && session.status === "authenticated") {
      if (telegramUrlDraft) {
        const updateProfileTelegram = async () => {
          const profileBody = { ...telegramUrlDraft };
          await clientApi
            .patch("/profile", profileBody)
            .then((res) => {
              setTelegramUrlDraft(null);
            })
            .catch((err) => {});
        };

        updateProfileTelegram();
      }

      const body = {
        ...draftGroup,
        leaderId: session.data.user.id,
      };
      clientApi.post("/groups", body).then((response) => {
        const group_id = response.data.id;
        setDraftGroup(null);
        router.push(
          `/competitions/${draftGroup.competitionId}/groups/${group_id}`
        );
        presentToast({
          description: "Group created!",
          status: "success",
          position: "top",
        });
      });
    }
  }, [draftGroup, session]);

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
