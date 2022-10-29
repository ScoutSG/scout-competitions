import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type HasEditOrDeleteGroup = {
  hasEdit: boolean;
  hasDelete: boolean;
};

const hasEditOrDeleteGroupState = atom<HasEditOrDeleteGroup>({
  key: "HAS_EDIT_OR_DELETE_GROUP",
  default: {
    hasEdit: false,
    hasDelete: false,
  },
  effects_UNSTABLE: [persistAtom],
});

const useHasEditOrDeleteGroup = () => {
  const [hasEditOrDeleteGroup, setHasEditOrDeleteGroup] = useRecoilState(
    hasEditOrDeleteGroupState
  );

  return {
    hasEditOrDeleteGroup,
    setHasEditOrDeleteGroup,
  };
};

export const useHasEditGroup = () => {
  const { hasEditOrDeleteGroup, setHasEditOrDeleteGroup } =
    useHasEditOrDeleteGroup();

  const hasEdit = hasEditOrDeleteGroup.hasEdit;
  const setHasEdit = (val) => {
    setHasEditOrDeleteGroup({ ...hasEditOrDeleteGroup, hasEdit: val });
  };

  return {
    hasEdit,
    setHasEdit,
  };
};

export const useHasDeleteGroup = () => {
  const { hasEditOrDeleteGroup, setHasEditOrDeleteGroup } =
    useHasEditOrDeleteGroup();

  const hasDelete = hasEditOrDeleteGroup.hasDelete;
  const setHasDelete = (val) => {
    setHasEditOrDeleteGroup({ ...hasEditOrDeleteGroup, hasDelete: val });
  };

  return {
    hasDelete,
    setHasDelete,
  };
};
