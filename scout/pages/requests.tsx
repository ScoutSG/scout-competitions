import React, { useEffect, useState } from "react";
import ApplicationPreviewUnit from "../components/ApplicationPreviewUnit";
import { Stack, Text, Button, Badge, Container } from "@chakra-ui/react";
import { TbLock } from "react-icons/tb";
import { useSession } from "next-auth/react";
import clientApi from "../core/api/client";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";

const ApplicationsPreview = () => {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function getApplications() {
      const response = await clientApi.get("/applications");
      setApplications(response.data);
    }

    getApplications();
  }, []);

  return status !== "authenticated" ? (
    <Container maxW="1260px">
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
  ) : (
    <Container maxW="1260px">
      <Stack p={{ base: "4", md: "10" }} m="4" borderRadius="md">
        <Stack direction="row" alignItems="center">
          <Text fontWeight="semibold">Your Applications</Text>
        </Stack>
        <Text fontSize={{ base: "sm" }} textAlign={"left"}>
          {applications.length === 0
            ? "You currently have no applications."
            : "Check the status of your applications below."}
        </Text>
        {applications.length === 0 ? null : (
          <ApplicationPreviewUnit applications={applications} />
        )}
      </Stack>
    </Container>
  );
};

export default ApplicationsPreview;
