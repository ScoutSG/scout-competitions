import { chakra } from "@chakra-ui/react";
import vector from "../../assets/scout-vector-1.svg";
import Image from "next/image";

const ScoutVector: React.FC = () => {
  const ProductImage = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  return (
    <>
      <ProductImage src={vector} alt="vector" />
    </>
  );
};

export default ScoutVector;
