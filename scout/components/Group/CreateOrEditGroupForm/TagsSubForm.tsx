import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import { CreatableSelect, GroupBase, OptionBase } from "chakra-react-select";
import { useController, UseFormReturn } from "react-hook-form";
import { CreateOrEditGroupFormValue } from "./types";

const SUGGESTED_TAGS = [
  "Here for fun",
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
      <FormLabel>Tags</FormLabel>
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
      <FormHelperText>
        You can use this to indicate other miscellaneous characteristics about
        your team. For instance, you can indicate your motivations for joining
        this competition, or your preference for problem statement (if there are
        multiple problem statements). This helps you attract the right people to
        join your team!
      </FormHelperText>
    </FormControl>
  );
}
