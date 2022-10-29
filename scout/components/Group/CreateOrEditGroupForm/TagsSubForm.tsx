import { FormControl, FormLabel } from "@chakra-ui/react";
import { CreatableSelect, GroupBase, OptionBase } from "chakra-react-select";
import { useController, UseFormReturn } from "react-hook-form";
import Explanation from "../../Explanation";
import { CreateOrEditGroupFormValue } from "./types";

const SUGGESTED_TAGS = [
  "Here to have fun",
  "Here to win",
  "Here to learn",
  "Here to make friends",
];

interface OptionType extends OptionBase {
  value: string;
  label: string;
}
export const toOptionType = (skill: string): OptionType => ({
  value: skill,
  label: skill,
});
const SKILLS_OPTIONS: OptionType[] = SUGGESTED_TAGS.map(toOptionType);

const HELPER_TEXT =
  "Indicate other miscellaneous characteristics about your team (e.g. motivations for joining, preference for problem statement etc.). This helps you attract the right people to join your team!";

type TagsSubFormProps = Pick<
  UseFormReturn<CreateOrEditGroupFormValue>,
  "control"
>;

export default function TagsSubForm({ control }: TagsSubFormProps) {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController<CreateOrEditGroupFormValue>({
    name: "tags",
    control,
  });

  return (
    <FormControl>
      <FormLabel>
        Tags
        <Explanation label={HELPER_TEXT} />
      </FormLabel>
      <CreatableSelect<OptionType, true, GroupBase<OptionType>>
        placeholder="Tags"
        name="tags"
        ref={ref}
        isMulti
        options={SKILLS_OPTIONS}
        onChange={onChange}
        onBlur={onBlur}
        value={value as unknown as OptionType}
      />
    </FormControl>
  );
}
