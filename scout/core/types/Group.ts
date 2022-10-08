export interface Member {
  name: string;
  year: number;
  major: string;
  specialisation: string;
  profileUrl: string[];
}

export interface Application {
  applicant: Member;
  answers: {
    question: string;
    answer: number;
  }[];
  isApproved: boolean;
}

export interface Group {
  id: number;
  name: string;
  currentSize: number;
  targetSize: number;
  description: string;
  targetSkills: string[];
  members: Member[];
  hasApplied?: boolean;
  isLeader?: boolean;
  applications?: Application[];
}

export interface Question {
  questionId: number;
  questionString: string;
}
