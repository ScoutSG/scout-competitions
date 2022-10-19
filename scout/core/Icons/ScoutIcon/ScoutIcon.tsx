import { useColorMode } from "@chakra-ui/react";
import Image from "next/image";

const ScoutIcon = ({ width, height }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Image
        src={colorMode === "light" ? "/wordLogo.svg" : "/wordLogoDark.svg"}
        alt="icon"
        layout="fixed"
        width={width}
        height={height}
      />
    </>
  );
};

export default ScoutIcon;
