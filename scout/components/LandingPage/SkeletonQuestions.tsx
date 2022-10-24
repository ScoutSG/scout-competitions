import {
  Box,
  Flex,
  Input,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { Md10K } from "react-icons/md";

const SkeletonQuestions: React.FC = () => {
  const labelStyles = {
    mt: "4",
    color: "gray.500"
  };

  return (
    <Flex mt={16} pr={{base: 4, sm: 8, md: 16, xl: 32}}>
      <Flex
        bgGradient="linear(to-tr, #ED6EA0, #EC8C69)"
        width={{base: "320px", sm: "350px", md: "400px"}}
        height={{base: "320px"}}
        mt={8}
        rounded="2xl"
      >
        <Box
          width={{base: "320px", md: "400px"}}
          bgColor="whiteAlpha.900"
          position="absolute"
          transform={{base:"rotate(3deg) translate(0px, 24px)", sm: "rotate(3deg) translate(-24px, 24px)"}}
          rounded="2xl"
          boxShadow="2xl"
          pt={4}
          pb={12}
          px={8}
        >
          <Text fontWeight="medium" fontSize={{base: "lg", sm: "xl", md: "2xl"}} color="gray.600">
            How comfortable are you with product design?
          </Text>
          <Slider defaultValue={4} min={1} max={5} step={1}>
            <SliderMark value={1} {...labelStyles}>
              1
            </SliderMark>
            <SliderMark value={2} {...labelStyles}>
              2
            </SliderMark>
            <SliderMark value={3} {...labelStyles}>
              3
            </SliderMark>
            <SliderMark value={4} {...labelStyles}>
              4
            </SliderMark>
            <SliderMark value={5} {...labelStyles}>
              5
            </SliderMark>
            <SliderTrack bg="teal.100">
              <SliderFilledTrack bg="teal.600" />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
        <Box
          width={{base: "320px", md: "400px"}}
          bgColor="whiteAlpha.900"
          position="absolute"
          transform={{base: "rotate(-3deg) translate(0px, 192px)", sm:"rotate(-3deg) translate(32px, 176px)", md: "rotate(-3deg) translate(32px, 192px)"}}
          rounded="2xl"
          boxShadow="2xl"
          py={4}
          px={8}
        >
          <Text fontWeight="medium" fontSize={{base: "lg", sm: "xl", md: "2xl"}} color="gray.600">
            Which problem statement interests you? 
          </Text>
          <Input mt={4} variant="filled" placeholder="I want to tackle ..." background="blackAlpha.200" focusBorderColor="blackAlpha.300" color="gray.500" _placeholder={{color: "gray.400"}} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default SkeletonQuestions;
