import { useToast, ToastProps } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast();

  const presentToast = (props: ToastProps) => {
    if (!props.duration) {
      toast({ ...props, duration: 5000, isClosable: true });
    } else {
      toast({ ...props });
    }
  };

  return { presentToast };
};
