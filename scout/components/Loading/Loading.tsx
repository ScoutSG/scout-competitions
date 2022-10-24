import React from "react";
import { Spinner, Stack, Box, keyframes } from "@chakra-ui/react";
import ScoutIconMark from "../../core/Icons/ScoutIconMark";

const animationKeyframes = keyframes`
  0% { transform: scale(0.75) rotate(0) }
  25% { transform: scale(1) rotate(5deg) }
  50% { transform: scale(1) rotate(-45deg) }
  75% { transform: scale(1) rotate(360deg) }
  100% { transform: scale(0.75) rotate(0) }
`;

const animation = `${animationKeyframes} 4s  ease-in-out infinite`;

const Loading = () => {
  return (
    <Stack
      spacing={4}
      align="center"
      justify="center"
      left="50%"
      top="35%"
      position="fixed"
    >
      <Box animation={animation}>
        <ScoutIconMark />
      </Box>
      <Spinner color="primary.500" size="sm" />
    </Stack>
  );
};

export default Loading;
