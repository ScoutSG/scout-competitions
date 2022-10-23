import React, { useEffect, useState } from "react";
import ApplicationPreviewUnit from "../components/ApplicationPreviewUnit";
import {
  Stack,
  Text,
  Button,
  Container,
  CircularProgress,
  Heading,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { TbLock } from "react-icons/tb";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";
import clientApi from "../core/api/client";
import { Group } from "../core/types/Group";
import Loading from "../components/Loading";
import { maxWidth } from "../core/utils/maxWidth";
import PageContainer from "../components/PageContainer";

const ApplicationsPreview = () => {
  const { status } = useSession();
  const [applications, setApplications] = useState<
    | {
        group: Group;
        isApproved: boolean;
        answers: {
          answerResponse: number;
          question: {
            id: number;
            questionString: string;
            questionType: string;
          };
        }[];
      }[]
    | null
  >(null);
  const router = useRouter();

  useEffect(() => {
    async function getApplications() {
      try {
        const response = await clientApi.get("/applications");
        setApplications(response.data);
      } catch (err) {
        if (err.code === "ERR_BAD_REQUEST") {
          router.push("/");
        } else {
          throw err;
        }
      }
    }

    getApplications();
  }, [status]);

  if (applications === null) {
    return <Loading />;
  }

  return (
    <PageContainer>
      <Head>
        <title>My Requests</title>
      </Head>
      <Container maxW={maxWidth}>
        <Stack p={{ base: "4", md: "10" }} m="4" borderRadius="md">
          <Stack direction="row" alignItems="center">
            <Heading as="h1" size="md">
              My Requests
            </Heading>
            {status === "unauthenticated" ? <TbLock /> : null}
          </Stack>

          {status !== "authenticated" ? (
            <>
              <Text fontSize={{ base: "sm" }} textAlign={"left"}>
                We cannot show you your requests until you've signed in!
              </Text>
              <Link href="/auth/signin">
                <Button colorScheme="purple" rightIcon={<ChevronRightIcon />}>
                  Sign in to view your requests
                </Button>
              </Link>
            </>
          ) : (
            <>
              {applications === null ? (
                <CircularProgress isIndeterminate color="primary.500" />
              ) : (
                <Text>
                  {applications.length === 0
                    ? "You currently have no requests."
                    : "Check the status of your requests below."}
                </Text>
              )}

              {applications === null || applications.length === 0 ? null : (
                <ApplicationPreviewUnit applications={applications} />
              )}
            </>
          )}
        </Stack>
      </Container>
    </PageContainer>
  );
};

export default ApplicationsPreview;
