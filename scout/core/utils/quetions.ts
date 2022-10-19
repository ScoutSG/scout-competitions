interface QuestionStruct {
  question: string;
  type: string; // type of response expected
}

// adapted from https://sparkbay.com/en/culture-blog/psychological-safety-survey-questions-34
export const PSYCHOLOGICAL_SAFETY: QuestionStruct[] = [
  {question: "On a scale of 1 to 5, to what extent do you hold it against other team members if they make mistakes?", type: ""},
  {question: "On a scale of 1 to 5, to what extent do you welcome different opinions from your team members?", type: ""},
  {question: "On a scale of 1 to 5, to what extent will you act in a way that undermines others' efforts?", type: ""}
];

// taken from https://ca.indeed.com/career-advice/interviewing/dependability-interview-questions
// taken from https://rework.withgoogle.com/print/guides/5721312655835136/
export const DEPENDABILITY: QuestionStruct[] = [
  {question: "Tell us how well you communicate with people?", type: ""},
  {question: "On a scale of 1 to 5, how much do you value delivering work on time?", type: ""},
  {question: `On a scale of 1 to 5, how often do you say you will do something and follow through with it`, type: ""}
]

// taken from https://rework.withgoogle.com/print/guides/5721312655835136/
export const STRUCTURE: QuestionStruct[] = [
  {question: "On a scale of 1 to 5, how much do you value clear deliverables and deadlines?", type: ""},
  {question: "On a scale of 1 to 5, how far will you go to ensure every meeting has a clear agenda?", type: ""}
]

export const MEANING: QuestionStruct[] = [
  {question: "On a scale of 1 to 5, how meaningful is this competition to you?", type: ""},
]

// taken from https://rework.withgoogle.com/print/guides/5721312655835136/
export const IMPACT: QuestionStruct[] = [
  {question: `If you were a member of the team, how do you think your work will contribute to the team's goals?`, type: ""}
]

