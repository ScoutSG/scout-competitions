import { atom, useRecoilState, useRecoilValue } from "recoil";
import { checkUserIsMember } from "../../core/utils/isMember";

const userIdInputState = atom({
  key: "USER_ID",
  default: null,
});

export const useUserDetails = () => {
  const [userDetails, setUserDetails] = useRecoilState(userIdInputState);

  return {
    userDetails,
    setUserDetails,
  };
};

export const userIsMember = (
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
