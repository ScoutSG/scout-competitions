import { useSession } from "next-auth/react";
import { checkUserIsMember } from "../../core/utils/isMember";

export const useIsMember = (
  members: {
    id: number;
    name: string;
    email: string;
  }[]
) => {
  const session = useSession();
  if (!session.data || !session.data.user) {
    return false;
  }
  return checkUserIsMember(session.data.user.id, members);
};
