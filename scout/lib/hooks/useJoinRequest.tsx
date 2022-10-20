import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type JoinRequest = {
  id: string | string[];
} | null;

const joinRequestState = atom<JoinRequest>({
  key: "ID",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const useJoinRequest = () => {
  const [joinRequest, setJoinRequest] = useRecoilState(joinRequestState);

  return {
    joinRequest,
    setJoinRequest,
  };
};
