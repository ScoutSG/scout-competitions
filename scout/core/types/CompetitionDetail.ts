export interface CompetitionData {
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

export interface GroupSummaryData {
  id: number;
  name: string;
  currentSize: number;
  targetSize: number;
  description: string;
  leader: Member;
  leaderId: number;
  goal: string;
  targetSkills: string[];
  competitionId: number;
  tags: string[];
  members: Member[];
  hasApplied?: boolean;
  isLeader?: boolean;
  telegramLink?: string;
}

export interface Member {
  id: number;
  email: string;
  name: string;
  image: string;
  school: string;
  yearOfStudy: number;
  major: string;
  skills: string[];
  specialisation: string;
  linkedinUrl?: string;
  gitHubUrl?: string;
  telegramUrl?: string;
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
