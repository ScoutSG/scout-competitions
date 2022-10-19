export type CreateOrEditGroupFormValue = {
  name: string;
  description: string;
  targetSize: number;
  targetSkills: { value: string; label: string }[];
  tags: { value: string; label: string }[];
  questions: { questionType: string; questionString: string }[];
  withTelegramGroup: boolean;
};
