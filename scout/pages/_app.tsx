import { Session } from "next-auth";
import { useSession } from "next-auth/react"
import { SessionProvider } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]"
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";
import PageContainer from "../components/PageContainer";
import Loading from "../components/Loading";

const App = ({ Component, pageProps }: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Auth>
        <RecoilRoot>
          <ChakraProvider theme={theme}>
            <PageContainer>
              <Component {...pageProps} />
            </PageContainer>
          </ChakraProvider>
        </RecoilRoot>
      </Auth>
    </SessionProvider>
  );
};

function Auth( { children }) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <Loading />
    );
  }

  return children;
}

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

export async function getServerSideProps(context) {
  return {
    props: {
      session: await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
      )
    },
  };
}

export default App;
