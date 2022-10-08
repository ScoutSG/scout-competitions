import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";
import PageContainer from "../components/PageContainer";

const App = ({ Component, pageProps }: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </RecoilRoot>
    </SessionProvider>
  );
};

import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    primary: {
      50: "#177DF1",
      100: "#177DF1",
      200: "#177DF1",
      300: "#177DF1",
      400: "#177DF1",
      500: "#177DF1",
      600: "#177DF1",
      700: "#177DF1",
      800: "#177DF1",
      900: "#177DF1",
    },
    secondary: "#FF9966",
    primaryLight: "#4FA2FF",
    secondaryLight: "#FFCC99",
  },
});

export default App;
