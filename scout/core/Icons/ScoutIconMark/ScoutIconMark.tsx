import { chakra, Box } from "@chakra-ui/react";
import logoMark from "../../assets/logo-mark.svg";
import Image from "next/image";

const ScoutIconMark: React.FC = ({
  width = "100px",
  height = "100px",
}: {
  width: string;
  height: string;
}) => {
  const ProductImage = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt", "layout", "sizes"].includes(prop),
  });

  return (
    <>
      <ProductImage
        src={logoMark}
        alt="logo-mark"
        width={width}
        height={height}
        animation={""}
      />
    </>
  );
};

export default ScoutIconMark;
