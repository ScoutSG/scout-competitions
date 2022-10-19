import React, { useEffect, useState } from "react";
import ApplicationPreviewUnit from "../components/ApplicationPreviewUnit";
import {
  Stack,
  Text,
  Button,
  Container,
  CircularProgress,
} from "@chakra-ui/react";
import { TbLock } from "react-icons/tb";
import { useSession } from "next-auth/react";
import clientApi from "../core/api/client";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Group } from "../core/types/Group";
import Loading from "../components/Loading";
import { maxWidth } from "../core/utils/maxWidth";
import PageContainer from "../components/PageContainer";

const ApplicationsPreview = () => {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState<
    | {
        group: Group;
        isApproved: boolean;
        answers: {
          answerResponse: number;
          question: {
            id: number;
            questionString: string;
          };
        }[];
      }[]
    | null
  >(null);

  useEffect(() => {
    async function getApplications() {
      const response = await clientApi.get("/applications");
      setApplications(response.data);
    }

    getApplications();
  }, [status]);

  return applications === null ? (
    <Loading />
  ) : status !== "authenticated" ? (
    <PageContainer>
      <Container maxW={maxWidth}>
        <Stack p={{ base: "4", md: "10" }} m="4" borderRadius="md">
          <Stack direction="row" alignItems="center">
            <Text fontWeight="semibold">Your Applications</Text>
            <TbLock />
          </Stack>

          <Text fontSize={{ base: "sm" }} textAlign={"left"}>
            We cannot show you your applications until you've signed in!
          </Text>
          <Link href="/auth/signin">
            <Button colorScheme="purple" rightIcon={<ChevronRightIcon />}>
              Sign in to view your applications
            </Button>
          </Link>
        </Stack>
      </Container>
    </PageContainer>
  ) : (
    <PageContainer>
      <Container maxW={maxWidth}>
        <Stack p={{ base: "4", md: "10" }} m="4" borderRadius="md">
          <Stack direction="row" alignItems="center">
            <Text fontWeight="semibold">Your Applications</Text>
          </Stack>
          {applications === null ? (
            <CircularProgress isIndeterminate color="primary.500" />
          ) : (
            <Text fontSize={{ base: "sm" }} textAlign={"left"}>
              {applications.length === 0
                ? "You currently have no applications."
                : "Check the status of your applications below."}
            </Text>
          )}

          {applications === null || applications.length === 0 ? null : (
            <ApplicationPreviewUnit applications={applications} />
          )}
        </Stack>
      </Container>
    </PageContainer>
  );
};

export default ApplicationsPreview;
