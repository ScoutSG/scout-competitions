import {
  Flex,
  Heading,
  Input,
  Button,
  // Image,
  Box,
  Img,
  chakra,
} from "@chakra-ui/react";
import styles from "./index.module.scss";
import logo from "../../assets/logo.svg";
import Image from "next/image";

const ScoutsIcon: React.FC = () => {
  const ProductImage = chakra(Image, {
    // baseStyle: { maxH: 120, maxW: 120 },
    shouldForwardProp: (prop) =>
      ["width", "height", "src", "alt"].includes(prop),
  });
  return (
    <>
      <ProductImage src={logo} width={250} height={100} />
    </>
  );
};

export default ScoutsIcon;
