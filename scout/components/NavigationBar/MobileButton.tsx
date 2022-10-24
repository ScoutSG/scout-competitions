import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

const MobileButton = (props: {
  onToggle: MouseEventHandler<HTMLButtonElement>;
  isOpen: any;
}) => {
  return (
    <Flex
      flex={{ base: 1, md: "auto" }}
      ml={{ base: -2 }}
      display={{ base: "flex", lg: "none" }}
    >
      <IconButton
        onClick={props.onToggle}
        icon={
          props.isOpen ? (
            <CloseIcon w={3} h={3} />
          ) : (
            <HamburgerIcon w={5} h={5} />
          )
        }
        variant={"ghost"}
        aria-label={"Toggle Navigation"}
      />
    </Flex>
  );
};

export default MobileButton;
