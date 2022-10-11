export interface Member {
  id: number;
  email: string;
  name: string;
  year: number;
  major: string;
  specialisation: string;
  linkedinUrl: string;
  gitHubUrl: string;
}

export interface Application {
  applicant: Member;
  answers: {
    question: Question;
    answerResponse: number;
  }[];
  isApproved: boolean;
  id: number;
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

export interface QuestionsData {
  groupId: number;
  id: number; // formId
  questions: Question[]
}

export interface Form {
  id: number;
  groupId: number;
  questions: {
    id: number;
    questionString: string;
    formId: number;
  }[];
}
