import { useToast, ToastProps } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast();

  const presentToast = (props: ToastProps) => {
    toast({ ...props, duration: 5000, isClosable: true });
  };

  return { presentToast };
};
