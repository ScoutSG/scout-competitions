import { useSession } from "next-auth/react";
import {
  checkUserIsLeader,
  checkUserIsMember,
} from "../../core/utils/isMember";

export const useIsMember = (
  members: {
    id: number;
    name: string;
    email: string;
  }[]
) => {
  const session = useSession();
  if (!session.data) {
    return false;
  }
  return checkUserIsMember(session.data.user.id, members);
};

export const useIsLeader = (leaderId: number) => {
  const session = useSession();
  if (!session.data) {
    return false;
  }
  return checkUserIsLeader(session.data.user.id, leaderId);
};
