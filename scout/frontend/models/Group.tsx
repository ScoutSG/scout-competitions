import { Group } from "../../frontend/types/Group";

export const modelGroup: Group = {
  id: 123,
  name: "Scout",
  size: 1,
  targetSize: 4,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  targetSkills: [
    "react",
    "next",
    "typescript",
    "node",
    "figma",
    "adobe xd",
    "javascript",
    "web development",
    "software engineering",
  ],
  members: [
    {
      name: "John Doe",
      year: 3,
      major: "Computer Science",
      specialisation: "Database Systems",
      profileUrl: ["https://www.github.com", "https://www.linkedin.com"],
    },
  ],
  hasApplied: false,
  isLeader: true,
  applications: [
    {
      applicant: {
        name: "Didymus",
        year: 3,
        major: "Computer Science",
        specialisation: "AI",
        profileUrl: [
          "https://www.github.com/didymental",
          "https://www.linkedin.com/in/didymusne",
        ],
      },
      answers: [
        {
          question: "Rate your skill at React from 1 to 5",
          answer: 3,
        },
        {
          question: "Rate your skill at Next from 1 to 5",
          answer: 1,
        },
      ],
      isApproved: false,
    },
    {
      applicant: {
        name: "Didymus",
        year: 3,
        major: "Computer Science",
        specialisation: "AI",
        profileUrl: ["https://www.github.com", "https://www.linkedin.com"],
      },
      answers: [
        {
          question: "Rate your skill at React from 1 to 5",
          answer: 3,
        },
        {
          question: "Rate your skill at Next from 1 to 5",
          answer: 3,
        },
      ],
      isApproved: false,
    },
  ],
};
