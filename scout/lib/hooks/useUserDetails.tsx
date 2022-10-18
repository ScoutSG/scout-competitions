import { atom, useRecoilState, useRecoilValue } from "recoil";
import { checkUserIsMember } from "../../core/utils/isMember";

const userIdInputState = atom({
  key: "userId",
  default: null,
});

export const useIsMember = (
  members: {
    id: number;
    name: string;
    email: string;
  }[]
) => {
  const user = useRecoilValue(userIdInputState);
  if (!user) {
    return false;
  }
  return checkUserIsMember(user.id, members);
};
