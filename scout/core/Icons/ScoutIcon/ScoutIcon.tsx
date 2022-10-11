import { chakra } from "@chakra-ui/react";
import logo from "../../assets/logo.svg";
import Image from "next/image";

const ScoutIcon = ({ width }: { width?: number }) => {
  const ProductImage = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  return (
    <>
      <ProductImage
        src={logo}
        alt="icon"
        layout="fixed"
        width={width ? null : 100}
        height={width ?? 70}
      />
    </>
  );
};

export default ScoutIcon;
