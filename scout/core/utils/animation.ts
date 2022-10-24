import {
  keyframes
} from "@chakra-ui/react";

const animationKeyframes = keyframes`
    0% { transform: translateY(100px); opacity: 0.25}
    10% { transform: scale(1) rotate(0deg); opacity: 0.5}
    20% { transform: scale(1) rotate(0deg); opacity: 0.75}
    30% { transform: scale(1) rotate(0deg); opacity: 1}
  `;

export const slideUpAnimation = `${animationKeyframes} 4s  ease-in-out`;