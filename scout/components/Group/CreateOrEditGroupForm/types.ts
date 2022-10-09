export type CreateOrEditGroupFormValue = {
  name: string;
  description: string;
  targetSize: number;
  targetSkills: { value: string; label: string }[];
  questions: { questionString: string }[];
};
