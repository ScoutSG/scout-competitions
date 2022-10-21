import { useMediaQuery } from "@chakra-ui/react";

// 48em is the default breakpoint for width size = md
export const useIsLargerThanMd = () => {
  const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");
  return isLargerThanMd;
};
