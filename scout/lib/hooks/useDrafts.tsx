import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import clientApi from "../../core/api/client";
import { useCustomToast } from "./useCustomToast";
import { useDraftGroup, useDraftTelegram } from "./useDraftGroup";
import { useDraftRequest } from "./useDraftRequest";
import { useJoinRequest } from "./useJoinRequest";

export const useDrafts = () => {
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
          router.push(`/competitions/${competitionId}/groups/${groupId}`);
        })
        .catch((err) => {
          presentToast({
            status: "error",
            title: "Unable to join group",
            description: err?.response?.data?.message || "",
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
          });
          router.push("/requests");
        } catch (err) {
          presentToast({
            title: "Failed to submit your request",
            status: "error",
            description: err?.response?.data?.message || "",
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
        });
      });
    }
  }, [draftGroup, session]);

  useEffect(() => {
    if (telegramUrlDraft && session.status === "authenticated") {
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
  }, [telegramUrlDraft, session]);
};
