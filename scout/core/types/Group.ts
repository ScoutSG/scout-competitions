export interface Member {
  id: number;
  email: string;
  name: string;
  image: string;
  school: string;
  yearOfStudy: number;
  major: string;
  specialisation: string;
  skills: string[];
  linkedinUrl?: string;
  gitHubUrl?: string;
  telegramUrl?: string;
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
  competitionId: number;
  currentSize: number;
  targetSize: number;
  description: string;
  leader: Member;
  goal: string;
  targetSkills: string[];
  tags: string[];
  members: Member[];
  hasApplied?: boolean;
  isLeader?: boolean;
  telegramLink?: string;
  applications?: Application[];
}

export enum QuestionType {
  Range = "Range",
  OpenEnded = "OpenEnded",
}

export interface Question {
  id: number;
  questionString: string;
  questionType: QuestionType;
}

export interface QuestionsData {
  groupId: number;
  id: number; // formId
  questions: Question[];
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
