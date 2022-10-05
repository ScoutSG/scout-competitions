import { chakra } from "@chakra-ui/react";
import logo from "../../../assets/logo.svg";
import Image from "next/image";

const ScoutIcon: React.FC = () => {
  const ProductImage = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  return (
    <>
      <ProductImage src={logo} width={250} height={100} />
    </>
  );
};

export default ScoutIcon;
