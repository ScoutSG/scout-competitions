import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type DraftRequest =
  | {
      formId: number;
      groupId: number;
      answers: {
        answerString: string;
        questionId: number;
      }[];
    }
  | {};

const draftRequestState = atom<DraftRequest>({
  key: "DRAFT_REQUEST",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const useDraftRequest = () => {
  const [draftRequest, setDraftRequest] = useRecoilState(draftRequestState);

  return {
    draftRequest,
    setDraftRequest,
  };
};
