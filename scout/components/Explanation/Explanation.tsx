import {
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";

export default function Explanation({ label }: { label: string }) {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Icon marginLeft={1} color="grey" />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>{label}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
