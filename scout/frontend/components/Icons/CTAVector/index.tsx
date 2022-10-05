import { chakra } from "@chakra-ui/react";
import vector from "../../../assets/scout_vector_1.svg";
import Image from "next/image";

const ScoutVector: React.FC = () => {
  const ProductImage = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  return (
    <>
      <ProductImage src={vector} width={570} height={300} />
    </>
  );
};

export default ScoutVector;
