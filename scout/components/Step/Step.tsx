import React, { ReactElement } from "react";
import NextLink from "next/link";
import { Stat, StatLabel, StatNumber, Stack } from "@chakra-ui/react";

interface StepProps {
  title: string;
  text: string;
  icon: ReactElement;
  href: string;
  bgColor?: string;
}

const Step = ({ title, text, icon, href, bgColor }: StepProps) => {
  return (
    <NextLink href={href}>
      <a>
        <Stat
          px={{ base: 4, md: 8 }}
          py={"5"}
          shadow={"xl"}
          rounded={"lg"}
          bg={bgColor || "gray.50"}
          h="100%"
        >
          <Stack direction="row" spacing={5} align="center">
            <Stack spacing={5}>
              <StatNumber fontSize={"2xl"} fontWeight={"semibold"}>
                {title}
              </StatNumber>

              <StatLabel fontWeight={"medium"} fontSize="lg">
                {text}
              </StatLabel>
            </Stack>
            {icon}
          </Stack>
        </Stat>
      </a>
    </NextLink>
  );
};

export default Step;
