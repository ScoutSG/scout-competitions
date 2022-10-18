export type CreateOrEditGroupFormValue = {
  name: string;
  description: string;
  targetSize: number;
  targetSkills: { value: string; label: string }[];
  tags: { value: string; label: string }[];
  questions: { questionString: string }[];
  withTelegramGroup: boolean;
};
