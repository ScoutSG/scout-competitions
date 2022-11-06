import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";
import Loading from "../components/Loading";
import Head from "next/head";
import ReactGA from "react-ga4";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/800.css";
import "../core/styles/global.scss";
import { useDrafts } from "../lib/hooks/useDrafts";

if (process.env.NEXT_PUBLIC_APP_TRACKING_ID) {
  ReactGA.initialize(process.env.NEXT_PUBLIC_APP_TRACKING_ID);
}

const InnerApp = ({ Component, pageProps }: AppProps) => {
  useDrafts();
  return <Component {...pageProps} />;
};

const App = (props: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider session={props.pageProps.session}>
      <Auth>
        <RecoilRoot>
          <ChakraProvider theme={theme}>
            <Head>
              <title>Scout</title>
            </Head>
            <InnerApp {...props} />
          </ChakraProvider>
        </RecoilRoot>
      </Auth>
    </SessionProvider>
  );
};

function Auth({ children }) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <ChakraProvider theme={theme}>
        <Loading />
      </ChakraProvider>
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
      50: "#D1E5FC",
      100: "#B9D8FB",
      200: "#8BBEF8",
      300: "#74B1F7",
      400: "#4597F4",
      500: "#1571D9",
      600: "#1264C1",
      700: "#1058A9",
      800: "#0E4B91",
      900: "#0C3f79",
    },
    primaryLight: "#177DF1",
    secondaryLight: "#FFCC99",
    secondary: "#FF9966",
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
});

export async function getServerSideProps(context) {
  return {
    props: {
      session: await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
      ),
    },
  };
}

export default App;
