export interface CompetitionData {
    name: string;
    deadline: string;
    organiserName: string;
    description: string;
    urlLink: string;
    maxSize: number | null;
    minSize: number | null;
    groups: GroupSummaryData[] | [];
}

export interface GroupSummaryData {
    id: number;
    name: string;
    size: number;
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
  
  