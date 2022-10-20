import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import clientApi from "../../core/api/client";
import { useCustomToast } from "../../lib/hooks/useCustomToast";
import { useJoinRequest } from "../../lib/hooks/useJoinRequest";
import Loading from "../../components/Loading";
import { Container } from "@chakra-ui/react";

interface Invite {
  code: string;
  name: string;
}

const JoinPage = () => {
  const router = useRouter();
  const session = useSession();
  const { presentToast } = useCustomToast();
  const { setJoinRequest } = useJoinRequest();

  useEffect(() => {
    if (!session.data || !session.data.user) {
      setJoinRequest({
        id: router.query.code,
      });
      router.push("/auth/signin");
      presentToast({
        title: "Almost there! Login to to join.",
        position: "top",
        status: "info",
      });
    } else {
      let code = router.query.code;
      const body = {
        userId: session.data.user.id,
      };

      clientApi.patch(`/invitations/${code}`, body).then((res) => {
        let { competitionId, groupId } = res.data;

        router.push(`/competitions/${competitionId}/groups/${groupId}`);
      });
    }
  }, []);

  return (
    <Container>
      <Loading />
    </Container>
  );
};

export default JoinPage;
