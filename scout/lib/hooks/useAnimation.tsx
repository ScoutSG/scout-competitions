import { useRef } from "react";
import { useInView } from "framer-motion";
import { keyframes } from "@chakra-ui/react";

export const useSlideUpAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const animationKeyframes = keyframes`
    0% { transform: translateY(100px); opacity: 0.25}
    10% { transform: scale(1) rotate(0deg); opacity: 0.5}
    20% { transform: scale(1) rotate(0deg); opacity: 0.75}
    30% { transform: scale(1) rotate(0deg); opacity: 1}
  `;

  const animation = isInView ? `${animationKeyframes} 4s  ease-in-out` : "";

  return { ref, animation };
};

export const useSlideLeftAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const animationKeyframes = keyframes`
    0% { transform: translateX(100px); opacity: 0.25}
    10% { transform: scale(1) rotate(0deg); opacity: 0.5}
    20% { transform: scale(1) rotate(0deg); opacity: 0.75}
    30% { transform: scale(1) rotate(0deg); opacity: 1}
  `;

  const animation = isInView ? `${animationKeyframes} 4s  ease-in-out` : "";

  return { ref, animation };
};
