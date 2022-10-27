import { FormControl, FormLabel } from "@chakra-ui/react";
import { CreatableSelect, GroupBase, OptionBase } from "chakra-react-select";
import { useController, UseFormReturn } from "react-hook-form";
import SKILLS from "../../../core/utils/skills";
import Explanation from "../../Explanation";
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

const HELPER_TEXT =
  "Indicate what skillsets you're looking for in prospective group members (e.g. tech stack, marketing etc.). This helps you attract the right people to join your team!";

export default function SkillsSubForm({ control }: SkillsSubFormProps) {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController<CreateOrEditGroupFormValue>({
    name: "targetSkills",
    control,
  });

  return (
    <FormControl>
      <FormLabel>
        Looking for
        <Explanation label={HELPER_TEXT} />
      </FormLabel>
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
