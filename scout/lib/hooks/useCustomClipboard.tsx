import { useState, useEffect } from "react";
import { useClipboard } from "@chakra-ui/react";

// fix clipboard to update hasCopied after 0.5s
export const useCustomClipboard = (val: string) => {
  const { hasCopied, onCopy } = useClipboard(val, 500);

  return { hasCopied, onCopy };
};

export const useUrlClipboard = (afterLink: string) => {
  return useCustomClipboard(
    (typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "") + afterLink
  );
};
