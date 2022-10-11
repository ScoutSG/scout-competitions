import { atom, useRecoilState } from "recoil";

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
});

export const useDraftRequest = () => {
  const [draftRequest, setDraftRequest] = useRecoilState(draftRequestState);

  return {
    draftRequest,
    setDraftRequest,
  };
};
