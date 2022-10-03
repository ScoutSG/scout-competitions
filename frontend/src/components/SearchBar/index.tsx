import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

/**
 * Defines the behaviour for the Search functionality.
 */
const SearchBar: React.FC = () => {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color={"gray.300"} />}
      />
      <Input placeholder="Search" />
    </InputGroup>
  );
};

export default SearchBar;
