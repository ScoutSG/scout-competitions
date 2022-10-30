import { useToast, ToastProps } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast();

  const presentToast = (props: ToastProps) => {
    if (!props.duration) {
      toast({ duration: 5000, isClosable: true, position: "top", ...props });
    } else {
      toast({ ...props });
    }
  };

  return { presentToast };
};
