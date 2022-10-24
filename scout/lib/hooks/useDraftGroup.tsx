import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type DraftGroup = {
  competitionId: number;
  name: string;
  description: string;
  currentSize: number;
  targetSize: number;
  targetSkills: string[];
  form: {
    questions: { questionString: string }[];
  };
} | null;

type TelegramUrl = {
  telegramUrl: string;
};

const draftGroupState = atom<DraftGroup>({
  key: "DRAFT_GROUP",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

const telegramUrlState = atom<TelegramUrl>({
  key: "TELEGRAM_URL",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const useDraftGroup = () => {
  const [draftGroup, setDraftGroup] = useRecoilState(draftGroupState);

  return {
    draftGroup,
    setDraftGroup,
  };
};

export const useDraftTelegram = () => {
  const [telegramUrlDraft, setTelegramUrlDraft] =
    useRecoilState(telegramUrlState);

  return {
    telegramUrlDraft,
    setTelegramUrlDraft,
  };
};
