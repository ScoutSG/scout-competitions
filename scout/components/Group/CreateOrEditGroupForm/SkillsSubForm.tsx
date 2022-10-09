import { FormControl, FormLabel, Text } from "@chakra-ui/react";
import { CreatableSelect, GroupBase, OptionBase } from "chakra-react-select";
import { useController, UseFormReturn } from "react-hook-form";
import SKILLS from "../../../core/utils/skills";
import { CreateOrEditGroupFormValue } from "./types";

interface OptionType extends OptionBase {
  value: string;
  label: string;
}
export const toOptionType = (skill: string): OptionType => ({
  value: skill,
  label: skill,
});
const SKILLS_OPTIONS: OptionType[] = SKILLS.map(toOptionType);

type SkillsSubFormProps = Pick<
  UseFormReturn<CreateOrEditGroupFormValue>,
  "control"
>;

export default function SkillsSubForm({ control }: SkillsSubFormProps) {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController<CreateOrEditGroupFormValue>({
    name: "targetSkills",
    control,
  });

  return (
    <FormControl>
      <FormLabel>Target skills</FormLabel>
      <Text>
        You can use this to indicate what skillsets you're looking for in
        prospective group members. For instance, you can indicate your tech
        stack here, or other skills you're looking for such as marketing. This
        helps you attract the right people to join your team!
      </Text>
      <CreatableSelect<OptionType, true, GroupBase<OptionType>>
        placeholder="Skills"
        name="targetSkills"
        ref={ref}
        isMulti
        options={SKILLS_OPTIONS}
        onChange={onChange}
        onBlur={onBlur}
        value={value as OptionType}
      />
    </FormControl>
  );
}
