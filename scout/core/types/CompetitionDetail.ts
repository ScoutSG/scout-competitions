export interface CompetitionData {
  id: number;
  name: string;
  deadline: string;
  organiserName: string;
  description: string;
  link: string;
  maxSize: number | null;
  minSize: number | null;
  groups: GroupSummaryData[] | [];
}

export interface GroupSummaryData {
  id: number;
  name: string;
  currentSize: number;
  targetSize: number;
  description: string;
  targetSkills: string[];
  leader: Member;
}

export interface Member {
  name: string;
  year: number;
  major: string;
  specialization: string;
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
}
