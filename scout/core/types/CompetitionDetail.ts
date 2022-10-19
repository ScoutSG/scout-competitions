export interface GroupSummaryData {
  id: number;
  name: string;
  currentSize: number;
  targetSize: number;
  description: string;
  targetSkills: string[];
  tags: string[];
  members: Member[];
}

export interface Member {
  id: number;
  email: string;
  name: string;
  year: number;
  major: string;
  specialisation: string;
  profileUrl: string[];
}

export interface CompetitionDataSummary {
  id: number;
  name: string;
  deadline: string;
  organiserName: string;
  description: string;
  link: string;
  maxSize: number | null;
  minSize: number | null;
  firstPrize: string | null;
  secondPrize: string | null;
  thirdPrize: string | null;
  otherPrizes: string | null
  groups: GroupSummaryData[];
}
